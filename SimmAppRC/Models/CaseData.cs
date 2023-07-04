using Antlr.Runtime.Tree;
using SimmAppRC.Classes;
using System;
using System.Collections.Generic;

namespace SimmAppRC.Models
{
    //---------------------------------------------------------------------------------------------------------------------------------------

    public class CaseContent
    {
        public int case_id { get; set; } = 0;
        public int case_attribution_id { get; set; } = 0;
        public Int64 case_timestamp { get; internal set; }
        public string steps_list { get; internal set; } = "[]";
        public string case_properties { get; internal set; } = "{}";
        public string case_end_properties { get; internal set; } = "{}";
        public string case_completions { get; internal set; } = "{}";
        public int user_id { get; internal set; } = 0;
        public int role_id { get; internal set; } = 0;
    }

    //---------------------------------------------------------------------------------------------------------------------------------------

    public class StepContent
    {
        public int case_id { get; set; } = 0;
        public int step_id { get; set; } = 0;
        public string step_properties { get; set; } = "{}";
        public string step_informations_list { get; set; } = "[]";
        public string step_answers_list { get; set; } = "[]";
        public string step_retros_list { get; set; } = "[]";
    }

    //-----------------------------------------------------------------------------------------------------------------

    //public class CaseStepInfo
    //{
    //    public int case_id { get; set; } = 0;
    //    public int step_id { get; set; } = 0;
    //    public StepProperties step_properties { get; set; } = new StepProperties();
    //}

    //-----------------------------------------------------------------------------------------------------------------

    public class CaseProperties
    {
        public string case_name { get; set; } = "Case Name";
        public string patient_name { get; set; } = "Patient Name";
        public string discipline { get; set; } = "Discipline Name";
        public string creator { get; set; } = "Creator Name";
        public string briefing { get; set; } = "";
        public string image { get; set; } = "";
        public bool? approved { get; set; } = false;
    }

    //-----------------------------------------------------------------------------------------------------------------

    //public class StepProperties
    //{
    //    public string step_name { get; set; } = "Step Name";
    //    public bool show_answer { get; set; } = true;
    //    public int step_type { get; set; } = 1;
    //}

    //-----------------------------------------------------------------------------------------------------------------

}