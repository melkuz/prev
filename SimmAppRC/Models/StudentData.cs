using System;

namespace SimmAppRC.Models
{
    //-----------------------------------------------------------------------------------------------------------------

    public class StudentData
    {
        public string student_data_list { get; set; } = "[]";
        public int current_step { get; set; } = 0;
        public int nb_completed_steps { get; set; } = 0;
        public bool answers_current_steps { get; set; } = false;
        public string new_hypothesis { get; set; } = "";
        public string last_hypothesis_list { get; set; } = "[]";
        public string perso_notes { get; set; } = "";
        public string end_data { get; set; } = "{}";
    }

    //-----------------------------------------------------------------------------------------------------------------

    public class StudentDataCaseCompletion
    {
        public int trial_id { get; set; }
        public string last_date { get; set; }
        public bool started { get; internal set; }
        public bool completed { get; set; }
        public int student_data_id { get; internal set; }
        public int case_version { get; internal set; }
        public int trial_case_id { get; internal set; }
    }

    //-----------------------------------------------------------------------------------------------------------------
}