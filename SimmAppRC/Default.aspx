<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SimmAppRC._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    
   <%
       //SimmAppRC.Classes.AppTools.DebugWrite("Default.asp: Role = " + SimmAppRC.Models.Utilisateur.Role);
       //if (SimmAppRC.Models.Utilisateur.Role.ToLower() == "administrateur")
       //{
       //    Response.WriteFile(fl);
       //}
       //else if (SimmAppRC.Models.Utilisateur.Role.ToLower() == "professeur")
       //{
       //    Response.WriteFile(fl);
       //}
       //else
       //{
       //    Response.WriteFile(fl);
       //}

       Response.WriteFile(fl);
    %>

</asp:Content>
