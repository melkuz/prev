<%@ Page Title="Claims" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Claims.aspx.cs" Inherits="SimmAppRC.Claims" %>
<%@ Import Namespace="SimmAppRC.Models"%>
<%@ Import Namespace="System.Security.Claims"%>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container" id="ressource-claims-adfs">
        <% var lstClaims = Utilisateur.Claims;
            var cip = Utilisateur.Cip;
            var courriel = Utilisateur.Courriel;

            if(lstClaims != null) { %>
           
            <div class="row ">
                <table class="table">
                        <tbody>
                            <tr>
                                <td>CIP</td>
                                <td><%=cip%></td>
                            </tr>
                            <tr>
                                <td>Courriel</td>
                                <td><%=courriel%></td>
                            </tr>
                            <% foreach (Claim claim in lstClaims)
                            { %>
                                <tr>
                                    <td><%=claim.Type%></td>
                                    <td><%=claim.Value%></td>
                                </tr>
                         <% } %>
                        </tbody>
                </table>
            </div>
        <% } %>
    
    </div>
</asp:Content>
