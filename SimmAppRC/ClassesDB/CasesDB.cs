using Antlr.Runtime;
using SimmAppRC.Classes;
using SimmAppRC.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SimmAppRC.ClassesDB
{
    public class CasesDB
    {
        //-------------------------------------------------------------------------------------------------------------

        internal static string Get_StepsList(int caseID)
        {
            int i = 0;
            string s = "[";

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Steps_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", caseID);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                int step_id = (int)dataReader["StepID"];
                                string step_properties = dataReader["StepProperties"].ToString();

                                s += (i++ > 0 ? "," : "");

                                s += "{\"case_id\": " + caseID + ", \"step_id\": " + step_id + ", \"step_properties\": " + step_properties + " }";
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            s += "]";

            return s;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static CaseContent Get_CaseProperties(int caseID)
        {
            var caseInfo = new CaseContent();

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Case_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", caseID);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                caseInfo.case_id = (int)dataReader["CaseID"];
                                caseInfo.case_timestamp = (Int64)dataReader["CaseTimeStamp"];
                                caseInfo.case_properties = dataReader["CaseProperties"].ToString();
                                caseInfo.case_end_properties = dataReader["CaseEndProperties"].ToString();
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return caseInfo;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static CaseContent Get_CasePropertiesAndSteps(int caseID)
        {
            string steps_list = Get_StepsList(caseID);

            var caseInfo = new CaseContent();

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Case_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", caseID);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                caseInfo.case_id = (int)dataReader["CaseID"];
                                caseInfo.case_timestamp = (Int64)dataReader["CaseTimeStamp"];
                                caseInfo.case_properties = dataReader["CaseProperties"].ToString();
                                caseInfo.case_end_properties = dataReader["CaseEndProperties"].ToString();
                                caseInfo.steps_list = steps_list;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return caseInfo;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static string Get_Cases()
        {
            int i = 0;
            string s = "[";

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Cases_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                int case_id = (int)dataReader["CaseID"];
                                int student_data_count = (int)dataReader["StudentDataCount"];
                                int case_version = (int)dataReader["CaseVersion"];
                                string case_properties = dataReader["CaseProperties"].ToString();

                                s += (i++ > 0 ? "," : "");
                                s += "{\"case_id\":" + case_id + ",\"student_data_count\":" + student_data_count + ",\"case_version\":" + case_version + ", \"case_properties\":" + case_properties + "}";
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            s += "]";

            return s;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static string Get_Cases_StudentMenu(int userID, int roleID)
        {
            int i = 0;
            string s = "[";

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Cases_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("UserID", userID);
                    cmd.Parameters.AddWithValue("RoleID", roleID);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                int case_id = (int)dataReader["ApprovedCaseID"];
                                int case_version = (int)dataReader["ApprovedCaseVersion"];
                                string case_properties = dataReader["CaseProperties"].ToString();
                                int completed = (int)dataReader["CompletedCount"];
                                int started = (int)dataReader["StartedCount"];

                                s += (i++ > 0 ? "," : "");
                                s += "{\"case_id\":" + case_id + ",\"case_version\":" + case_version + ",\"started\":" + started + ",\"completed\":" + completed + ", \"case_properties\":" + case_properties + "}";
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            s += "]";

            return s;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static int Set_CaseProperties(int case_id, bool case_approved, string case_properties_str, bool newCaseVersion = false)
        {
            string message = "";
                
            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Case_u_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", case_id);
                    cmd.Parameters.AddWithValue("CaseApproved", case_approved);
                    cmd.Parameters.AddWithValue("CaseProperties", case_properties_str);
                    cmd.Parameters.AddWithValue("NewCaseVersion", newCaseVersion);
                    con.Open();

                    try
                    {
                        case_id = (Int32)cmd.ExecuteScalar();

                        if (case_id == -2)
                        {
                            message = "Case not updated !";
                        }
                    }
                    catch (Exception ex)
                    {
                        message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return case_id;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static List<Discipline> Get_Disciplines()
        {
            var disciplines = new List<Discipline>();

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Disciplines_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                var discipline = new Discipline();

                                discipline.id = (int)dataReader["DisciplineID"];
                                discipline.discipline_name = dataReader["DisciplineName"].ToString();

                                disciplines.Add(discipline);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return disciplines;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static string Set_CaseInfo(int caseID, string casePropertiesStr, string caseEndPropertiesStr)
        {
            string message = "";

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Case_properties_u_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", caseID);
                    cmd.Parameters.AddWithValue("CaseProperties", casePropertiesStr);
                    cmd.Parameters.AddWithValue("CaseEndProperties", caseEndPropertiesStr);
                    con.Open();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return message;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static int Set_StepInfo(StepContent stepInfo)
        {
            int stepID = 0;

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Step_u_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", stepInfo.case_id);
                    cmd.Parameters.AddWithValue("StepID", stepInfo.step_id);
                    cmd.Parameters.AddWithValue("StepProperties", stepInfo.step_properties);
                    cmd.Parameters.AddWithValue("StepInformations", stepInfo.step_informations_list);
                    cmd.Parameters.AddWithValue("StepAnswers", stepInfo.step_answers_list);
                    cmd.Parameters.AddWithValue("StepRetros", stepInfo.step_retros_list);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                stepID = (int)dataReader["StepID"];
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return stepID;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static void Set_StepOrder(int case_id, string new_order)
        {

        }


        //-------------------------------------------------------------------------------------------------------------

        internal static StepContent Get_StepPropertiesAndLists(int case_id, int step_id)
        {
            var stepInfo = new StepContent();

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Step_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", case_id);
                    cmd.Parameters.AddWithValue("StepID", step_id);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                stepInfo.case_id = case_id;
                                stepInfo.step_id = step_id;
                                stepInfo.step_properties = dataReader["StepProperties"].ToString();
                                stepInfo.step_informations_list = dataReader["StepInformationsList"].ToString();
                                stepInfo.step_answers_list = dataReader["StepAnswersList"].ToString();
                                stepInfo.step_retros_list = dataReader["StepRetrosList"].ToString();
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return stepInfo;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static void Delete_Step(int case_id, int step_id)
        {
            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Step_d_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", case_id);
                    cmd.Parameters.AddWithValue("StepID", step_id);
                    con.Open();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static void Copy_CaseSteps(int case_id, int new_case_id)
        {
            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Steps_copy_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", case_id);
                    cmd.Parameters.AddWithValue("NewCaseID", new_case_id);
                    con.Open();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static string Get_StudentData(int caseID, int userID, int roleID,int student_data_id)
        {
            int studentDataID = 0;
            string studentData = "{}";
            string caseCompleted = "false";

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.StudentData_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", caseID);
                    cmd.Parameters.AddWithValue("UserID", userID);
                    cmd.Parameters.AddWithValue("RoleID", roleID);
                    cmd.Parameters.AddWithValue("StudentDataID", student_data_id);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                studentDataID = (int)dataReader["StudentDataID"];
                                studentData = dataReader["StudentData"].ToString();
                                caseCompleted = (bool)dataReader["Completed"] ? "true" : "false";
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return "{\"student_data_id\":" + studentDataID + ",\"case_completed\":" + caseCompleted + ",\"student_data\":" + studentData + "}";
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static int Set_StudentData(int studentDataID, int case_id, int user_id, int role_id, string studentData, bool case_completed)
        {
            if(studentDataID <= 0)
            {
                var x = 0;
            }

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.StudentData_u_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("StudentDataID", studentDataID);
                    cmd.Parameters.AddWithValue("CaseID", case_id);
                    cmd.Parameters.AddWithValue("UserID", user_id);
                    cmd.Parameters.AddWithValue("RoleID", role_id);
                    cmd.Parameters.AddWithValue("Completed", case_completed);
                    cmd.Parameters.AddWithValue("StudentData", studentData);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                studentDataID = (int)dataReader["studentDataID"];
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return studentDataID;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static void Delete_StudentData(int studentDataID)
        {
            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.StudentData_d_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("StudentDataID", studentDataID);
                    con.Open();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static List<StudentDataCaseCompletion> Get_CaseCompletions(int case_id, int userID, int roleID)
        {
            var completionsList = new List<StudentDataCaseCompletion>();

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.StudentData_completions_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CaseID", case_id);
                    cmd.Parameters.AddWithValue("UserID", userID);
                    cmd.Parameters.AddWithValue("RoleID", roleID);

                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                var caseCompletion = new StudentDataCaseCompletion();

                                caseCompletion.trial_case_id = (int)dataReader["trial_case_id"];
                                caseCompletion.case_version = (int)dataReader["case_version"];
                                caseCompletion.student_data_id = (int)dataReader["student_data_id"];
                                caseCompletion.trial_id = (int)dataReader["trial_id"];
                                caseCompletion.last_date = (string)dataReader["last_date"];
                                caseCompletion.completed = (bool)dataReader["Completed"];

                                completionsList.Add(caseCompletion);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return completionsList;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static List<UserData> Get_ListUsers()
        {
            var userList = new List<UserData>();

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.Users_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                var user = new UserData();

                                user.cip = (string)dataReader["CIP"];
                                user.user_id = (int)dataReader["UserID"];
                                user.role_id = (int)dataReader["RoleID"];
                                user.user_name = (string)dataReader["UserName"];
                                user.role_name = (string)dataReader["RoleName"];

                                userList.Add(user);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return userList;
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static void Set_UserRole(int user_id, int role_id)
        {
            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.UsersRoles_u_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("UserID", user_id);
                    cmd.Parameters.AddWithValue("RoleID", role_id);
                    con.Open();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }
        }

        // -------------------------------------------------------------------------------------------------------------

        internal static void Get_UserRole(UserData user)
        {
            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.UserRole_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("CIP", user.cip);
                    cmd.Parameters.AddWithValue("UserName", user.user_name);
                    cmd.Parameters.AddWithValue("UserEmail", user.claims_email);
                    cmd.Parameters.AddWithValue("ClaimsRole", user.claims_role);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            if (dataReader.Read())
                            {
                                user.user_id    = (int)dataReader["UserID"];
                                user.role_id    = (int)dataReader["RoleID"];
                                user.role_name  = (string)dataReader["RoleName"];
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }
        }

        //-------------------------------------------------------------------------------------------------------------

        internal static string Get_UserInfo(int user_id)
        {
            string user_info = "";

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.UserInfo_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("UserID", user_id);
                    con.Open();

                    try
                    {
                        using (SqlDataReader dataReader = cmd.ExecuteReader())
                        {
                            if (dataReader.Read())
                            {
                                user_info = (string)dataReader["UserInfo"];
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return user_info;
        }


        //-------------------------------------------------------------------------------------------------------------
        internal static int Set_UserInfo(int user_id, string user_info)
        {

            AppTools.DebugWrite("user_info" + user_info);

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.UserInfo_u_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("UserID", user_id);
                    cmd.Parameters.AddWithValue("UserInfo", user_info);
                    con.Open();

                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return 0;
        }


        //-------------------------------------------------------------------------------------------------------------

        public static int Get_DB_Version()
        {
            int DB_Version = 0;

            using (SqlConnection con = new SqlConnection(AppData.ConnectionStr))
            {
                using (SqlCommand cmd = new SqlCommand("dbo.DB_Version_s_sp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    try
                    {
                        DB_Version = (Int32)cmd.ExecuteScalar();
                    }
                    catch (Exception ex)
                    {
                        string message = ex.Message;

                        AppTools.DebugWrite("Erreur: " + message);
                    }
                }
            }

            return DB_Version;
        }

        //-------------------------------------------------------------------------------------------------------------
    }
}