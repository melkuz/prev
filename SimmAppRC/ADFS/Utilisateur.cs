using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace SimmAppRC.Models
{
    public static class Utilisateur
    {
        private static AdfsAuthenticationNouvelAdfs adfs = new AdfsAuthenticationNouvelAdfs();

        public static string Cip
        {
            get
            {
                return adfs.ObtenirCip();
            }
        }

        public static string Name
        {
            get
            {
                return adfs.ObtenirNom();
            }
        }


        public static IEnumerable<Claim> Claims
        {
            get
            {
                return adfs.ObtenirClaims();
            }
        }

        public static string Courriel
        {
            get
            {
                string courriel = "";

                var lstClaims = Utilisateur.Claims;
                if (lstClaims != null)
                {
                    foreach (Claim c in lstClaims)
                    {
                        if (c.Type.ToLower() == ClaimTypes.Email.ToLower())
                        {
                            courriel = c.Value;
                            break;
                        }
                    }
                }

                return courriel;
            }
        }

        public static string Role
        {
            get
            {
                string role = "";

                var lstClaims = Utilisateur.Claims;
                if (lstClaims != null)
                {
                    foreach (Claim c in lstClaims)
                    {
                        if (c.Type.ToLower() == ClaimTypes.Role.ToLower())
                        {
                            role = c.Value;
                            break;
                        }
                    }
                }

                return role;
                //return "professeur";    
            }
        }

        public static string RoleName { get; internal set; }
        public static int RoleID { get; internal set; }
        public static int UserID { get; internal set; }
    }
}