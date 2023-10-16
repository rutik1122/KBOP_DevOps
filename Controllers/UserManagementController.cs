using iBAS.Models;
using Npgsql;
using PagedList;
using PagedList.Mvc;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace iBAS.Controllers
{
    public class UserManagementController : Controller
    {

        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: UserManagement Maker
        public ActionResult UserList()
        {
            try
            {
                logerror("UserList Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                logerror("UserList Action", "Ending");
                return View();
            }
            catch (Exception e)
            {
                logerror("UserList Action Catch", e.Message);
                return View();
            }

        }


        public ActionResult CreateUser()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });


                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public ActionResult CreateUser(UserMaster model)
        {

            try
            {
                var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                // LoginId verification
                using (var con1 = new NpgsqlConnection(cs))
                {
                    con1.Open();

                    string sql = "select * from ibas_usermaster where loginid='" + model.LoginId.ToString() + "'";

                    using (var cmd = new NpgsqlCommand(sql, con1))
                    {
                        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                        {
                            while (rdr.Read())
                            {
                                // Login Id exists
                                return RedirectToAction("CreateUser", new { val = "Alert! LoginId already exists!" });
                            }
                        }
                    }
                }

                // Role
                string role = Request.Form["RoleList"].ToString();

                // Access level
                string AccessLevel = Request.Form["Accesslevel"].ToString();
                string AccessList = null;

                if (AccessLevel == "ORG")
                {
                    AccessList = Request.Form["OrgAccessPartialView"].ToString();
                }
                else if (AccessLevel == "CUST")
                {
                    AccessList = Request.Form["CustAccessPartialView"].ToString();
                }
                else if (AccessLevel == "DOM")
                {
                    AccessList = Request.Form["DomAccessPartialView"].ToString();
                }
                else if (AccessLevel == "BRANCH")
                {
                    AccessList = Request.Form["BranchAccessPartialView"].ToString();
                }

                string time = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");

                string sqlInsertUser = "INSERT INTO ibas_usermaster"
                        + "( loginid, password, "
                        + "firstname, lastname, active, firstlogin, "
                        + "lastlogin, invalidpasswordattempts, userdeleted, creationdate, createdby, usertype, accesslevel, "
                        + "roleid, l1startlimit, l1stoplimit, "
                        + "l2startlimit, l2stoplimit, "
                        + "l3startlimit,l3stoplimit ) "
                        + "VALUES ("
                        + "'" + model.LoginId.ToString() + "', pgp_sym_encrypt('newuser@123', 'ibas123'),"
                        + "'" + model.FirstName.ToString() + "', '" + Convert.ToString(model.LastName) + "', 1, 1, "
                        + "'" + time + "', 0, 0, '" + time + "', " + Convert.ToInt64(Session["uid"]) + ", '" + model.UserType + "', '" + AccessLevel + "', "
                        + Convert.ToInt32(role) + ", '" + Convert.ToString(model.L1StartLimit) + "', '" + Convert.ToString(model.L1StopLimit) + "', "
                        + "'" + Convert.ToString(model.L2StartLimit) + "', '" + Convert.ToString(model.L2StopLimit) + "', "
                        + "'" + Convert.ToString(model.L3StartLimit) + "', '" + Convert.ToString(model.L3StopLimit) + "') ";

                DbModel obj = new DbModel();
                string resp = obj.GetUpdateCount(cs, sqlInsertUser);


                // Fetch new user Id
                string userSql = "select * from ibas_usermaster where loginid='" + model.LoginId.ToString() + "'";
                int CreatedUserId = 0;
                using (var con2 = new NpgsqlConnection(cs))
                {
                    con2.Open();
                    using (var cmd = new NpgsqlCommand(userSql, con2))
                    {
                        cmd.ExecuteNonQuery();
                        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                        {
                            while (rdr.Read())
                            {
                                CreatedUserId = Convert.ToInt32(rdr["id"]);
                            }
                        }
                    }
                }

                string result = null;

                // User Organization Level mapping
                if (AccessLevel == "ORG" && CreatedUserId != 0)
                {
                    string[] lst = AccessList.Split(',');

                    result = UserOrgMappingCreation(CreatedUserId, time, lst);
                }
                // user Customer level mapping
                else if (AccessLevel == "CUST" && CreatedUserId != 0)
                {
                    string[] lst = AccessList.Split(',');

                    result = UserCustMappingCreation(CreatedUserId, time, lst);
                }
                // User Domain Level Mapping
                else if (AccessLevel == "DOM" && CreatedUserId != 0)
                {
                    string[] lst = AccessList.Split(',');

                    result = UserDomMappingCreation(CreatedUserId, time, lst);
                }
                // User Branch Level Mapping
                else if (AccessLevel == "BRANCH" && CreatedUserId != 0)
                {
                    string[] lst = AccessList.Split(',');

                    result = UserBranchMappingCreation(CreatedUserId, time, lst);
                }
                else
                {
                    return RedirectToAction("CreateUser");
                }

                string[] resultData = result.Split('|');

                if (resultData[0] == "FAILED")
                {
                    return RedirectToAction("CreateUser", new { val = "Alert! User Mapping Failed! " + Convert.ToString(resultData[1]) });
                }

                return RedirectToAction("CreateUser", new { val = "Alert! User " + model.LoginId.ToString() + " Created Successfully!" });
            }
            catch (Exception ex)
            {
                return RedirectToAction("CreateUser", new { val = "Alert! User Creation Failed! " + ex.Message });
            }
        }

        public ActionResult EditUser(int id)
        {
            try
            {
                logerror("EditUSer Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("EditUser Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult DeleteUser(int id)
        {
            try
            {
                logerror("DeleteUser Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("DeleteUser Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public PartialViewResult AccessLevel(string AccType = null)
        {
            try
            {
                List<AccessLevel> lst = new List<AccessLevel>();
                List<OrgAccessLevel> lstOrg = new List<OrgAccessLevel>();
                List<CustAccessLevel> lstCust = new List<CustAccessLevel>();
                List<DomAccessLevel> lstDom = new List<DomAccessLevel>();
                List<BranchAccessLevel> lstBranch = new List<BranchAccessLevel>();

                int count = 0;

                var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                DbModel db = new DbModel();

                //Session["uid"] = Id

                if (AccType == "DOM")
                {
                    string sql = "SELECT * FROM ibas_userdommapping WHERE active=1 and userid=" + Convert.ToString(Session["uid"]);
                    int c = 0;
                    DataSet ds = db.GetDataSet(cs, sql);

                    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        c = Convert.ToInt32(ds.Tables[0].Rows.Count);
                        for (int i = 0; i < c; i++)
                        {

                            string domainId = Convert.ToString(ds.Tables[0].Rows[i]["domainid"]);

                            string domainSql = "SELECT * FROM ibas_domainmaster WHERE id=" + domainId;
                            DataSet ds1 = db.GetDataSet(cs, domainSql);

                            if (ds1.Tables[0].Rows.Count > 0)
                            {
                                DomAccessLevel al = new DomAccessLevel();
                                al.DomainID = Convert.ToInt32(ds1.Tables[0].Rows[i]["id"]);
                                al.DomainName = Convert.ToString(ds1.Tables[0].Rows[i]["name"]);
                                lstDom.Add(al);
                            }
                        }
                    }

                    ViewBag.DomainCount = c.ToString();
                    ViewBag.DomAccessPartialView = new SelectList(lstDom.AsEnumerable(), "DomainID", "DomainName");
                    return PartialView("_DomAccessList");

                }
                else if (AccType == "BRANCH")
                {
                    string sql = "SELECT * FROM ibas_userbranchmapping WHERE active=1 and userid=" + Convert.ToString(Session["uid"]);
                    int c = 0;
                    DataSet ds = db.GetDataSet(cs, sql);

                    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        c = Convert.ToInt32(ds.Tables[0].Rows.Count);
                        for (int i = 0; i < c; i++)
                        {

                            string branchId = Convert.ToString(ds.Tables[0].Rows[i]["branchid"]);

                            string branchSql = "SELECT * FROM ibas_branchmaster WHERE id=" + branchId;
                            DataSet ds1 = db.GetDataSet(cs, branchSql);

                            if (ds1.Tables[0].Rows.Count > 0)
                            {
                                BranchAccessLevel al = new BranchAccessLevel();
                                al.BranchID = Convert.ToInt32(ds1.Tables[0].Rows[0]["id"]);
                                al.BranchName = Convert.ToString(ds1.Tables[0].Rows[0]["name"]);
                                lstBranch.Add(al);
                            }
                        }
                    }

                    ViewBag.BranchCount = c.ToString();
                    ViewBag.BranchAccessPartialView = new SelectList(lstBranch.AsEnumerable(), "BranchID", "BranchName");
                    return PartialView("_BranchAccessList");
                }



                using (var con = new NpgsqlConnection(cs))
                {
                    con.Open();

                    if (AccType == "ORG")
                    {
                        string sql = "SELECT * FROM ibas_organizationmaster";

                        using (var cmd = new NpgsqlCommand(sql, con))
                        {
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    OrgAccessLevel al = new OrgAccessLevel();
                                    al.OrgnizationID = Convert.ToInt64(rdr["id"]);
                                    al.OrgnizationName = Convert.ToString(rdr["name"]);
                                    lstOrg.Add(al);
                                    count++;
                                }
                            }
                        }

                        ViewBag.OrgCount = count.ToString();
                        ViewBag.OrgAccessPartialView = new SelectList(lstOrg.AsEnumerable(), "OrgnizationID", "OrgnizationName");
                        return PartialView("_OrgAccessList");
                    }
                    else if (AccType == "CUST")
                    {
                        string sql = "SELECT * FROM ibas_customermaster";

                        using (var cmd = new NpgsqlCommand(sql, con))
                        {
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    CustAccessLevel al = new CustAccessLevel();
                                    al.CustomerID = Convert.ToInt64(rdr["id"]);
                                    al.CustomerName = Convert.ToString(rdr["name"]);
                                    lstCust.Add(al);
                                    count++;
                                }
                            }
                        }

                        ViewBag.CustCount = count.ToString();
                        ViewBag.CustAccessPartialView = new SelectList(lstCust.AsEnumerable(), "CustomerID", "CustomerName");
                        return PartialView("_CustAccessList");
                    }

                }

                //ViewBag.AccessPartialView = new SelectList(lstOrg.AsEnumerable(), "OrgnizationID", "OrgnizationName");

                return PartialView("_AccessList");
            }
            catch (Exception ex)
            {
                ViewBag.AccessPartialView = "No Data";

                return PartialView("_AccessList");
            }

        }

        public string UserOrgMappingCreation(int UserId, string time, string[] lst)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;
                //string[] lst = AccessList.Split(',');

                for (int i = 0; i < lst.Length; i++)
                {
                    string OrgSql = "INSERT INTO ibas_userorgmapping ("
                        + "userid, organizationid, createdby,timestamp,active)"
                        + "VALUES ("
                        + UserId + ", " + Convert.ToInt32(lst[i]) + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1)";

                    using (var con2 = new NpgsqlConnection(cs))
                    {
                        con2.Open();
                        using (NpgsqlCommand cmd = new NpgsqlCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.CommandText = OrgSql;
                            cmd.Connection = con2;
                            int reccount = cmd.ExecuteNonQuery();

                        }
                    }

                    // Customer Level Mapping - Customer List
                    string CustSql = "select * from ibas_customermaster where organizationid=" + Convert.ToInt32(lst[i]) + "";

                    using (var con2 = new NpgsqlConnection(cs))
                    {
                        con2.Open();
                        using (var cmd = new NpgsqlCommand(CustSql, con2))
                        {
                            cmd.ExecuteNonQuery();
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    // User Customer Level mapping
                                    string CustUserSql = "INSERT INTO ibas_usercustmapping "
                                        + "(userid, customerid, createdby, timestamp, active)"
                                        + "VALUES ("
                                        + UserId + ", " + Convert.ToInt32(rdr["id"]) + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1)";

                                    using (var con3 = new NpgsqlConnection(cs))
                                    {
                                        con3.Open();
                                        using (NpgsqlCommand cmd1 = new NpgsqlCommand())
                                        {
                                            cmd1.CommandType = CommandType.Text;
                                            cmd1.CommandText = CustUserSql;
                                            cmd1.Connection = con3;
                                            int reccount = cmd1.ExecuteNonQuery();
                                        }
                                    }

                                    // Domain Level Mapping - Domain List
                                    string DomSql = "select * from ibas_domainmaster where customerid=" + Convert.ToInt32(rdr["id"]) + "";

                                    using (var con3 = new NpgsqlConnection(cs))
                                    {
                                        con3.Open();
                                        using (var cmd2 = new NpgsqlCommand(DomSql, con3))
                                        {
                                            cmd2.ExecuteNonQuery();
                                            using (NpgsqlDataReader rdr1 = cmd2.ExecuteReader())
                                            {
                                                while (rdr1.Read())
                                                {
                                                    string DomUserSql = "INSERT INTO ibas_userdommapping ("
                                                        + "userid, domainid, customerid, "
                                                        + "createdby, timestamp, active)"
                                                        + "VALUES ("
                                                        + UserId + ", " + Convert.ToInt32(rdr1["id"]) + ", " + Convert.ToInt32(rdr["id"]) + ", "
                                                        + Convert.ToInt32(Session["uid"]) + ", '" + time + "', 1)";

                                                    using (var con4 = new NpgsqlConnection(cs))
                                                    {
                                                        con4.Open();
                                                        using (NpgsqlCommand cmd1 = new NpgsqlCommand())
                                                        {
                                                            cmd1.CommandType = CommandType.Text;
                                                            cmd1.CommandText = DomUserSql;
                                                            cmd1.Connection = con4;
                                                            int reccount = cmd1.ExecuteNonQuery();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                }

                return "SUCCESS|User Mapping Completed";
            }
            catch (Exception ex)
            {
                return "FAILED|" + ex.Message;
            }
            return "";
        }


        public string UserCustMappingCreation(int UserId, string time, string[] lst)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                for (int x = 0; x < lst.Length; x++)
                {
                    string custSql = "INSERT INTO ibas_usercustmapping ("
                        + "userid, customerid, createdby, timestamp, active)"
                        + "VALUES ("
                        + UserId + ", " + Convert.ToInt32(lst[x]) + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1 )";

                    using (var con = new NpgsqlConnection(cs))
                    {
                        con.Open();
                        using (NpgsqlCommand cmd = new NpgsqlCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.CommandText = custSql;
                            cmd.Connection = con;
                            int reccount = cmd.ExecuteNonQuery();

                        }
                    }

                    string selectOrgMaster = "SELECT organizationid FROM ibas_customermaster where id=" + Convert.ToInt32(lst[x]);

                    using (var con = new NpgsqlConnection(cs))
                    {
                        con.Open();
                        using (var cmd = new NpgsqlCommand(selectOrgMaster, con))
                        {
                            cmd.ExecuteNonQuery();
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    int OrgId = Convert.ToInt32(rdr["organizationid"]);

                                    string findUserOrgMapping = "SELECT * FROM ibas_userorgmapping WHERE userid=" + UserId + " and organizationid=" + OrgId;

                                    bool DataAvailable = false;

                                    using (var con1 = new NpgsqlConnection(cs))
                                    {
                                        con1.Open();
                                        using (var cmd1 = new NpgsqlCommand(findUserOrgMapping, con1))
                                        {
                                            cmd1.ExecuteNonQuery();
                                            using (NpgsqlDataReader rdr1 = cmd1.ExecuteReader())
                                            {
                                                while (rdr1.Read())
                                                    DataAvailable = true;
                                            }
                                        }
                                    }

                                    if (DataAvailable == false)
                                    {
                                        string inserOrgMap = "INSERT INTO ibas_userorgmapping ("
                                            + "userid, organizationid, createdby,timestamp,active)"
                                            + "VALUES ("
                                            + UserId + ", " + OrgId + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1)";

                                        using (var con1 = new NpgsqlConnection(cs))
                                        {
                                            con1.Open();
                                            using (NpgsqlCommand cmd1 = new NpgsqlCommand())
                                            {
                                                cmd1.CommandType = CommandType.Text;
                                                cmd1.CommandText = inserOrgMap;
                                                cmd1.Connection = con1;
                                                int reccount = cmd1.ExecuteNonQuery();

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    string selectDomMaster = "SELECT * FROM ibas_domainmaster where customerid=" + Convert.ToInt32(lst[x]);

                    using (var con = new NpgsqlConnection(cs))
                    {
                        con.Open();
                        using (var cmd = new NpgsqlCommand(selectDomMaster, con))
                        {
                            cmd.ExecuteNonQuery();
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    string DomUserSql = "INSERT INTO ibas_userdommapping ("
                                        + "userid, domainid, customerid, "
                                        + "createdby, timestamp, active)"
                                        + "VALUES ("
                                        + UserId + ", " + Convert.ToInt32(rdr["id"]) + ", " + Convert.ToInt32(lst[x]) + ", "
                                        + Convert.ToInt32(Session["uid"]) + ", '" + time + "', 1)";

                                    using (var con4 = new NpgsqlConnection(cs))
                                    {
                                        con4.Open();
                                        using (NpgsqlCommand cmd1 = new NpgsqlCommand())
                                        {
                                            cmd1.CommandType = CommandType.Text;
                                            cmd1.CommandText = DomUserSql;
                                            cmd1.Connection = con4;
                                            int reccount = cmd1.ExecuteNonQuery();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return "SUCCESS|User Mapping Completed";
            }
            catch (Exception ex)
            {
                return "FAILED|" + ex.Message;
            }
        }


        public string UserDomMappingCreation(int UserId, string time, string[] lst)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;
                DbModel db = new DbModel();

                for (int i = 0; i < lst.Length; i++)
                {
                    // user Domain mapping

                    int domainId = Convert.ToInt32(lst[i]);
                    string branchListSql = "SELECT * FROM ibas_branchmaster WHERE domainid=" + domainId;
                    DataSet ds1 = db.GetDataSet(cs, branchListSql);

                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        for (int j = 0; j < ds1.Tables[0].Rows.Count; j++)
                        {
                            int branchId = Convert.ToInt32(ds1.Tables[0].Rows[j]["id"]);
                            string branchCode = Convert.ToString(ds1.Tables[0].Rows[j]["code"]);

                            string insert_branch = "INSERT INTO ibas_userbranchmapping (userid, branchid, branchcode, domainid, createdby, "
                            + "timestamp, active) "
                            + "VALUES "
                            + "(" + Convert.ToInt32(UserId) + ", " + branchId + ", '" + branchCode + "', " + domainId + ", " + Convert.ToInt32(Session["uid"]) + ", "
                            + "'" + time + "', 1)";

                            string recordinserted = db.GetUpdateCount(cs, insert_branch);
                        }
                    }


                    // user Customer mapping

                    string selectCustomerId = "select customerid from ibas_domainmaster where id=" + Convert.ToInt32(lst[i]);
                    int custId = 0;

                    DataSet ds2 = db.GetDataSet(cs, selectCustomerId);
                    if (ds2.Tables[0].Rows.Count > 0)
                    {
                        custId = Convert.ToInt32(ds2.Tables[0].Rows[0]["customerid"]);
                    }
                    else
                        return "SUCCESS|User Customer Mapping Failed";

                    //using (var con = new NpgsqlConnection(cs))
                    //{
                    //    con.Open();
                    //    using (var cmd = new NpgsqlCommand(selectCustomerId, con))
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                    //        {
                    //            while (rdr.Read())
                    //                custId = Convert.ToInt32(rdr["customerid"]);
                    //        }
                    //    }
                    //}

                    string findUserCustMapping = "select * from ibas_usercustmapping where userid=" + UserId + " and customerid=" + custId;
                    bool custMappingAvalable = false;
                    using (var con = new NpgsqlConnection(cs))
                    {
                        con.Open();
                        using (var cmd = new NpgsqlCommand(findUserCustMapping, con))
                        {
                            cmd.ExecuteNonQuery();
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                    custMappingAvalable = true;
                            }
                        }
                    }

                    if (custMappingAvalable == false)
                    {
                        string insertCustMapping = "INSERT INTO ibas_usercustmapping ("
                            + "userid, customerid, createdby, timestamp, active)"
                            + "VALUES ("
                            + UserId + ", " + custId + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1 )";

                        using (var con = new NpgsqlConnection(cs))
                        {
                            con.Open();
                            using (NpgsqlCommand cmd = new NpgsqlCommand())
                            {
                                cmd.CommandType = CommandType.Text;
                                cmd.CommandText = insertCustMapping;
                                cmd.Connection = con;
                                int reccount = cmd.ExecuteNonQuery();

                            }
                        }

                        //string getOrgId = null;
                        string getOrgId = "select organizationid from ibas_customermaster where id=" + custId;
                        int orgId = 0;
                        using (var con = new NpgsqlConnection(cs))
                        {
                            con.Open();
                            using (var cmd = new NpgsqlCommand(getOrgId, con))
                            {
                                cmd.ExecuteNonQuery();
                                using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                                {
                                    while (rdr.Read())
                                        orgId = Convert.ToInt32(rdr["organizationid"]);
                                }
                            }
                        }

                        string findUserOrgMapping = "select * from ibas_userorgmapping where userid=" + UserId + " and organizationid=" + orgId;
                        bool orgMappingAvalable = false;
                        using (var con = new NpgsqlConnection(cs))
                        {
                            con.Open();
                            using (var cmd = new NpgsqlCommand(findUserOrgMapping, con))
                            {
                                cmd.ExecuteNonQuery();
                                using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                                {
                                    while (rdr.Read())
                                        orgMappingAvalable = true;
                                }
                            }
                        }

                        if (orgMappingAvalable == false)
                        {
                            string OrgSql = "INSERT INTO ibas_userorgmapping ("
                                + "userid, organizationid, createdby,timestamp,active)"
                                + "VALUES ("
                                + UserId + ", " + orgId + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1)";

                            using (var con2 = new NpgsqlConnection(cs))
                            {
                                con2.Open();
                                using (NpgsqlCommand cmd = new NpgsqlCommand())
                                {
                                    cmd.CommandType = CommandType.Text;
                                    cmd.CommandText = OrgSql;
                                    cmd.Connection = con2;
                                    int reccount = cmd.ExecuteNonQuery();

                                }
                            }
                        }
                    }

                    string DomUserSql = "INSERT INTO ibas_userdommapping ("
                        + "userid, domainid, customerid, "
                        + "createdby, timestamp, active)"
                        + "VALUES ("
                        + UserId + ", " + Convert.ToInt32(lst[i]) + ", " + custId + ", "
                        + Convert.ToInt32(Session["uid"]) + ", '" + time + "', 1)";

                    using (var con = new NpgsqlConnection(cs))
                    {
                        con.Open();
                        using (NpgsqlCommand cmd = new NpgsqlCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.CommandText = DomUserSql;
                            cmd.Connection = con;
                            int reccount = cmd.ExecuteNonQuery();
                        }
                    }
                }

                return "SUCCESS|User Mapping Completed";
            }
            catch (Exception ex)
            {
                return "FAILED|" + ex.Message;
            }
        }


        public string UserBranchMappingCreation(int UserId, string time, string[] lst)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                for (int i = 0; i < lst.Length; i++)
                {
                    DbModel db = new DbModel();

                    string selectBranchDetails = "select id, domainid, code from ibas_branchmaster where id=" + Convert.ToInt32(lst[i]);
                    int branchid = 0;
                    int domainid = 0;
                    string branchcode = null;
                    DataSet ds = db.GetDataSet(cs, selectBranchDetails);

                    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        branchid = Convert.ToInt32(ds.Tables[0].Rows[0]["id"]);
                        domainid = Convert.ToInt32(ds.Tables[0].Rows[0]["domainid"]);
                        branchcode = Convert.ToString(ds.Tables[0].Rows[0]["code"]);
                    }


                    if (domainid != 0 && domainid != null && branchid != 0)
                    {
                        string insert_branch = "INSERT INTO ibas_userbranchmapping (userid, branchid, branchcode, domainid, createdby, "
                            + "timestamp, active) "
                            + "VALUES "
                            + "(" + Convert.ToInt32(UserId) + ", " + branchid + ", '" + branchcode + "', " + domainid + ", " + Convert.ToInt32(Session["uid"]) + ", "
                            + "'" + time + "', 1)";

                        string branch_response = db.GetUpdateCount(cs, insert_branch);

                        string dom_master = "SELECT * FROM ibas_domainmaster WHERE id=" + domainid;

                        DataSet ds_dom = db.GetDataSet(cs, dom_master);

                        if (ds_dom.Tables.Count > 0 && ds_dom.Tables[0].Rows.Count > 0)
                        {
                            int custId = Convert.ToInt32(ds_dom.Tables[0].Rows[0]["customerid"]);

                            string DomUserSql = "INSERT INTO ibas_userdommapping ("
                                + "userid, domainid, customerid, createdby, timestamp, active) "
                                + "VALUES ("
                                + UserId + ", " + Convert.ToInt32(lst[i]) + ", " + custId + ", " + Convert.ToInt32(Session["uid"]) + ", '" + time + "', 1)";

                            string dom_resp = db.GetUpdateCount(cs, DomUserSql);

                            string CustUserSql = "INSERT INTO ibas_usercustmapping ("
                                    + "userid, customerid, createdby, timestamp, active)"
                                    + "VALUES ("
                                    + UserId + ", " + custId + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1 )";

                            string cust_resp = db.GetUpdateCount(cs, CustUserSql);

                            string cust_master = "SELECT organizationid FROM ibas_customermaster WHERE id=" + custId;

                            DataSet ds_cust = db.GetDataSet(cs, cust_master);

                            if (ds_cust.Tables.Count > 0 && ds_cust.Tables[0].Rows.Count > 0)
                            {
                                int orgId = Convert.ToInt32(ds_cust.Tables[0].Rows[0]["organizationid"]);

                                string OrgSql = "INSERT INTO ibas_userorgmapping ("
                                    + "userid, organizationid, createdby,timestamp,active)"
                                    + "VALUES ("
                                    + UserId + ", " + orgId + ", " + Convert.ToInt64(Session["uid"]) + ", '" + time + "', 1)";

                                string org_resp = db.GetUpdateCount(cs, OrgSql);
                            }
                            else
                                return "FAILED|Customer id not found! Customer Id = " + Convert.ToString(custId);

                        }
                        else
                            return "FAILED|Domain id not found! Domain Id = " + Convert.ToString(domainid);

                    }
                    else
                        return "FAILED|Branch id not found! Branch Id = " + Convert.ToInt32(lst[i]);

                }

                return "SUCCESS|User Mapping Completed";
            }
            catch (Exception ex)
            {
                return "FAILED|" + ex.Message;
            }

        }

        //UserManagement Checker

        public ActionResult UserCheckerList()
        {
            try
            {
                logerror("UserCheckerList Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                logerror("UserCheckerList Action", "Ending");
                return View();
            }
            catch (Exception e)
            {
                logerror("UserCheckerList Action Catch", e.Message);
                return View();
            }

        }

        public ActionResult UserCreateChecker(int id)
        {
            try
            {
                logerror("EditUSer Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("EditUser Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult UserEditChecker(int id)
        {
            try
            {
                logerror("UserEditChecker Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("UserEditChecker Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult UserDeleteChecker(int id)
        {
            try
            {
                logerror("UserDeleteChecker Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("UserDeleteChecker Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult UserDetails(int id)
        {
            try
            {
                logerror("UserDetails Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                if (Convert.ToBoolean(Session["usermanagementmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("UserDetails Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        private void logerror(string errormsg, string errordesc)
        {
            ErrorDisplay er = new ErrorDisplay();
            string ServerPath = "";
            string filename = "";
            string fileNameWithPath = "";
            //FormsAuthentication.SignOut();


            //ViewBag.Error = e.InnerException;

            //-------------------------------- ServerPath = Server.MapPath("~/Logs/");----
            ServerPath = Server.MapPath("~/Logs/");
            if (System.IO.Directory.Exists(ServerPath) == false)
            {
                System.IO.Directory.CreateDirectory(ServerPath);
            }
            filename = DateTime.Now.ToString("yyyyMMdd") + "Logs.txt";
            fileNameWithPath = ServerPath + filename;
            System.IO.StreamWriter str = new System.IO.StreamWriter(fileNameWithPath, true, System.Text.Encoding.Default);
            //  str.WriteLine("hello");
            str.WriteLine(DateTime.Now.ToShortTimeString() + ": Exception: " + errormsg);
            str.WriteLine(DateTime.Now.ToShortTimeString() + ": StackTrace: " + errordesc);
            str.Close();
        }

    }
}