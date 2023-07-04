namespace SimmAppRC.Models
{
    //---------------------------------------------------------------------------------------------------------------------------------------

    public class Discipline
    {
        public int id { get; set; }
        public string discipline_name { get; set; }
    }

    //---------------------------------------------------------------------------------------------------------------------------------------

    public class UserData
    {
        public int user_id { get; set; }
        public int role_id { get; set; }
        public string cip { get; set; }
        public string user_name { get; set; }
        public string role_name { get; set; }
        public string claims_email { get; set; }
        public string claims_role { get; set; }
    }

    //---------------------------------------------------------------------------------------------------------------------------------------
}