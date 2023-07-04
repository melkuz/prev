using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SimmAppRC.Classes
{
    public class AppTools
    {
        //---------------------------------------------------------------------------------------------------------------------------------------

        public static void DebugWrite(string message)
        {
            Debug.WriteLine(new string('-', 80));
            Debug.WriteLine(message);
            Debug.WriteLine(new string('-', 80));
        }

        //---------------------------------------------------------------------------------------------------------------------------------------
    }
}