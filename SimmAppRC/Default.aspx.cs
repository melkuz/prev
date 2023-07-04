using Newtonsoft.Json;
using SimmAppRC.Classes;
using SimmAppRC.ClassesDB;
using SimmAppRC.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Web.UI;

namespace SimmAppRC
{
    public partial class _Default : Page
    {
        //-------------------------------------------------------------------------------------------------------------

        public string fl = "";

        //-------------------------------------------------------------------------------------------------------------

        protected void Page_Load(object sender, EventArgs e)
        {
            AppData.DB_Version = CasesDB.Get_DB_Version();

            if (Session["pageUrl"] != null)
            {
                SetUserInfo();

                string url = (string)HttpContext.Current.Session["pageUrl"];

                fl = url;
            }
            else
            {
                fl = SetHtmlPageInfo("", 0, 0);
            }
        }

        //-------------------------------------------------------------------------------------------------------------

        private static int Get_CurrentStudentDataID()
        {
            return (int)HttpContext.Current.Session["CurrentStudentDataID"];
        }

        //-------------------------------------------------------------------------------------------------------------

        private static int Get_CurrentCaseID()
        {
            return (int)HttpContext.Current.Session["CurrentCaseID"];
        }

        //-------------------------------------------------------------------------------------------------------------

        private static int Get_CurrentUserID()
        {
            return (int)HttpContext.Current.Session["CurrentUserID"];
        }

        //-------------------------------------------------------------------------------------------------------------

        private static int Get_CurrentRoleID()
        {
            return (int)HttpContext.Current.Session["CurrentRoleID"];
        }

        //-------------------------------------------------------------------------------------------------------------

        private static void SetUserInfo()
        {
            var user = new UserData();

            user.cip = Utilisateur.Cip;
            user.user_name = Utilisateur.Name;
            user.claims_email = Utilisateur.Courriel;
            user.claims_role = Utilisateur.Role;

            CasesDB.Get_UserRole(user);

            Utilisateur.RoleName = user.role_name;
            Utilisateur.RoleID = user.role_id;
            Utilisateur.UserID = user.user_id;

            HttpContext.Current.Session["CurrentUserID"] = user.user_id;
            HttpContext.Current.Session["CurrentRoleID"] = user.role_id;
        }

        //-------------------------------------------------------------------------------------------------------------

        public static string SetHtmlPageInfo(string url, int case_id, int student_data_id)
        {
            SetUserInfo();

            if (url.Length == 0)
            {
                if (Get_CurrentRoleID() == (int)AppData.RoleType.Teacher || Get_CurrentRoleID() == (int)AppData.RoleType.administrator)
                {
                    url = "VueJs/case_manager/index.html";
                }
                else
                {
                    url = "VueJs/student_menu/index.html";
                }
            }

            HttpContext.Current.Session["CurrentCaseID"] = case_id;
            HttpContext.Current.Session["CurrentStudentDataID"] = student_data_id;
            HttpContext.Current.Session["pageUrl"] = url;

            return url;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static void SetHtmlPage(string url, int case_id, int student_data_id)
        {
            SetHtmlPageInfo(url, case_id, student_data_id);
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static object ListCases()
        {
            var x = CasesDB.Get_Cases();

            return x;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static object StudentMenu_ListCases()
        {
            var x = CasesDB.Get_Cases_StudentMenu(Get_CurrentUserID(), Get_CurrentRoleID());

            return x;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static object StudentMenu_NewTrial(int case_id)
        {
            return 1;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static object StudentMenu_ContinueTrial(int case_id)
        {
            return 2;
        }

        //-------------------------------------------------------------------------------------------------------------
        [WebMethod]
        public static string StudentMenu_GetUserInfo()
        {
            var x = CasesDB.Get_UserInfo(Get_CurrentUserID());

            return x;
        }

        //-------------------------------------------------------------------------------------------------------------
        [WebMethod]
        public static string StudentMenu_SetUserInfo(string user_info)
        {

            AppTools.DebugWrite("user_info" + user_info);

            CasesDB.Set_UserInfo(Get_CurrentUserID(), user_info);

            return user_info;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static object StudentMenu_GetPropertiesCompletion(int case_id)
        {
            var x = CasesDB.Get_CaseProperties(case_id);

            var y = CasesDB.Get_CaseCompletions(case_id, Get_CurrentUserID(), Get_CurrentRoleID());

            x.case_completions = JsonConvert.SerializeObject(y);

            return x;
        }


        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static List<Discipline> GetDisciplines()
        {
            var x = CasesDB.Get_Disciplines();

            return x;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static void ApproveCase(int case_id, bool case_approved, string case_properties_str)
        {
            CasesDB.Set_CaseProperties(case_id, case_approved, case_properties_str);
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static int NewCase(CaseProperties case_properties)
        {
            case_properties.creator = Utilisateur.Name;

            string case_properties_str = JsonConvert.SerializeObject(case_properties);

            int case_id = CasesDB.Set_CaseProperties(0, false, case_properties_str);

            return case_id;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static int CopyCase(int case_id, bool case_approved, CaseProperties case_properties)
        {
            var caseInfo = CasesDB.Get_CasePropertiesAndSteps(case_id);
            string case_end_properties_str = caseInfo.case_end_properties;

            case_properties.case_name = case_properties.case_name + " (copie)";
            case_properties.creator = Utilisateur.Name;

            string case_properties_str = JsonConvert.SerializeObject(case_properties);

            int new_case_id = CasesDB.Set_CaseProperties(0, case_approved, case_properties_str);

            CasesDB.Set_CaseInfo(new_case_id, case_properties_str, case_end_properties_str);

            CasesDB.Copy_CaseSteps(case_id, new_case_id);

            return new_case_id;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static int AdminCase_CreateCaseVersion(int case_id, CaseProperties case_properties)
        {
            var caseInfo = CasesDB.Get_CasePropertiesAndSteps(case_id);
            int new_case_id = CasesDB.Set_CaseProperties(case_id, false, "", true);
            string case_properties_str = JsonConvert.SerializeObject(case_properties);

            CasesDB.Set_CaseInfo(new_case_id, case_properties_str, caseInfo.case_end_properties);
            CasesDB.Copy_CaseSteps(case_id, new_case_id);

            return new_case_id;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static string SetCase(int case_id, string case_properties, string case_end_properties)
        {
            string messge = CasesDB.Set_CaseInfo(case_id, case_properties, case_end_properties);

            return "";
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static void DeleteStep(int case_id, int step_id)
        {
            CasesDB.Delete_Step(case_id, step_id);
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static string NewStep(int case_id, int list_length)
        {
            var stepContent = new StepContent();

            stepContent.case_id = case_id;
            stepContent.step_id = 0;
            stepContent.step_properties = "{}";
            stepContent.step_informations_list = "[]";
            stepContent.step_answers_list = "[]";
            stepContent.step_retros_list = "[]";

            var step_id = CasesDB.Set_StepInfo(stepContent);

            string step_properties_str = "{\"step_name\":\"Nouvelle étape (" + (list_length + 1) + ")\",\"show_answer\":true,\"step_type\":1}";

            stepContent.step_id = step_id;
            stepContent.step_properties = step_properties_str;

            CasesDB.Set_StepInfo(stepContent);

            var step_item_str = "{\"case_id\": " + case_id + ", \"step_id\": " + step_id + ", \"step_properties\": " + step_properties_str + " }";

            return step_item_str;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]

        public static void SetStepOrder(int case_id, string new_order)
        {

            CasesDB.Set_StepOrder(case_id, new_order);

        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static string SetStepInfo(int case_id, int step_id, string step_properties, string step_informations_list, string step_answers_list, string step_retros_list)
        {
            var stepContent = new StepContent();

            stepContent.case_id = case_id;
            stepContent.step_id = step_id;
            stepContent.step_properties = step_properties;
            stepContent.step_informations_list = step_informations_list;
            stepContent.step_answers_list = step_answers_list;
            stepContent.step_retros_list = step_retros_list;

            CasesDB.Set_StepInfo(stepContent);

            return "";
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static CaseContent GetCaseContent()
        {
            var caseInfo = CasesDB.Get_CasePropertiesAndSteps(Get_CurrentCaseID());

            return caseInfo;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod]
        public static StepContent GetStepContent(int case_id, int step_id)
        {
            StepContent stepInfo = CasesDB.Get_StepPropertiesAndLists(case_id, step_id);

            return stepInfo;
        }

        //-------------------------------------------------------------------------------------------------------------
        // student_case
        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // 1 - ajax_mount_case
        public static CaseContent StudentCase_GetCaseContent()
        {
            var caseInfo = CasesDB.Get_CasePropertiesAndSteps(Get_CurrentCaseID());

            caseInfo.user_id = Get_CurrentUserID();
            caseInfo.role_id = Get_CurrentRoleID();

            return caseInfo;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // 2 - ajax_receive_step_info
        public static StepContent StudentCase_GetStepContent(int case_id, int step_id)
        {
            StepContent stepContent = CasesDB.Get_StepPropertiesAndLists(case_id, step_id);

            return stepContent;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // 3 - ajax_receive_student_data
        public static string StudentCase_GetStudentData(int student_data_id)
        {
            string s = CasesDB.Get_StudentData(Get_CurrentCaseID(), Get_CurrentUserID(), Get_CurrentRoleID(), Get_CurrentStudentDataID());

            return s;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // 3 - ajax_send_student_data
        public static int StudentCase_SendStudentData(int student_data_id, int case_id, string student_data, bool case_completed)
        {
            student_data_id = CasesDB.Set_StudentData(student_data_id, case_id, Get_CurrentUserID(), Get_CurrentRoleID(), student_data, case_completed);

            return student_data_id;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // 5 - ajax_delete_student_data
        public static void StudentCase_DeleteStudentData(int student_data_id)
        {
            CasesDB.Delete_StudentData(student_data_id);
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // get_all_users
        public static List<UserData> UserManager_ListUsers()
        {
            List<UserData> x = CasesDB.Get_ListUsers();

            return x;
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // modify_user_role
        public static void UserManager_ModifyRole(int user_id, int role_id)
        {
            CasesDB.Set_UserRole(user_id, role_id);

            if (user_id == Get_CurrentUserID())
            {
                HttpContext.Current.Session["pageUrl"] = null;
            }
        }

        //-------------------------------------------------------------------------------------------------------------

        [WebMethod] // get_user
        public static UserData CaseManager_GetUser()
        {
            var x = new UserData();

            x.user_id = Get_CurrentUserID();
            x.cip = Utilisateur.Cip;
            x.role_id = Get_CurrentRoleID();
            x.user_name = Utilisateur.Name;

            return x;
        }

        //-------------------------------------------------------------------------------------------------------------
    }
}
