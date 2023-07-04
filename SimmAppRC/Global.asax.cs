using SimmAppRC.Classes;
using System;
using System.Configuration;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;

namespace SimmAppRC
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            AppData.ConnectionStr = ConfigurationManager.ConnectionStrings["DEV-SimAppRC"].ConnectionString;
        }
    }
}