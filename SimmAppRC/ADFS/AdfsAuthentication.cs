using System;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Collections.Generic;

namespace SimmAppRC.Models
{
	public class AdfsAuthenticationNouvelAdfs : IAuthentificationUnique
	{
		public string ObtenirCip()
		{
			string sCip = string.Empty;

			try
			{
				ClaimsPrincipal oClaimsPrincipals = HttpContext.Current.User as ClaimsPrincipal;

				if (oClaimsPrincipals != null)
				{
					sCip = (from c in oClaimsPrincipals.Claims where c.Type == ClaimTypes.WindowsAccountName select c.Value).First();
				}
			}
			catch (Exception)
			{
				sCip = string.Empty;
			}

			return sCip;
		}

		/// <summary>
		/// Fonction qui retourne le nom de l'utilisateur par ADFS
		/// </summary>
		/// <returns>
		/// Le nom de l'utlisateur
		/// </returns>
		public string ObtenirNom()
		{
			return ObtenirClaim(ClaimTypes.Name.ToString());
		}

		public IEnumerable<Claim> ObtenirClaims()
		{
			IEnumerable<Claim> lstClaims = null;

			ClaimsPrincipal oClaimsPrincipals = HttpContext.Current.User as ClaimsPrincipal;

			if (oClaimsPrincipals != null)
			{
				lstClaims = oClaimsPrincipals.Claims;
			}

			return lstClaims;
		}

		public string ObtenirClaim(string sClaimType)
		{
			if (String.IsNullOrEmpty(sClaimType))
			{
				throw new ArgumentNullException();
			}

			string sClaim = string.Empty;

			ClaimsPrincipal oClaimsPrincipals = HttpContext.Current.User as ClaimsPrincipal;

			if (oClaimsPrincipals != null)
			{
				sClaim = (from c in oClaimsPrincipals.Claims
						  where c.Type == sClaimType
						  select c.Value).FirstOrDefault();
			}

			return sClaim;
		}
	}
}