using iBAS.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
//using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class CheckerController : Controller
    {

        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();
        string cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

        // GET: Checker
        public ActionResult Index()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }


        public ActionResult GetCash(string id, string refno, string transaction_type)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                //if (id == "0")
                //{
                //    DbModel db = new DbModel();
                //    string sql = "SELECT * FROM tb_count WHERE transactionrefno='" + refno + "' and local='CQ4'";
                //    DataSet ds = db.GetDataSet(cs, sql);

                //    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                //    {
                //        id = Convert.ToString(ds.Tables[0].Rows[0]["count_id"]);
                //    }
                //}
                ViewBag.Count_id = id;
                ViewBag.RefNo = refno;

                if (transaction_type == "CASHDEP")
                {
                    ViewBag.PageType = "Deposit";
                    return View("GetCashDeposit");
                }
                else if (transaction_type == "CASHWDL")
                {
                    ViewBag.PageType = "WithDraw";
                    return View("GetCashWithdraw");
                }
                return View();

            }
            catch (Exception e)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }


        public ActionResult CheckerForm(string id, string refno, string verf = null, string type = null, string DE = "N", string chq_id = "0")
        {
            try
            {
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                ViewBag.Count_id = id;
                ViewBag.cheque_id = chq_id;
                ViewBag.RefNo = refno;

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if (verf == "L2")
                    ViewBag.Verf = verf;
                else if (verf == "L3")
                    ViewBag.Verf = verf;

                ViewBag.tranType = type;

                if (Session["Editable_Checker"].ToString() == "N")
                {
                    if (type == "CASHDEP" || type == "CASHWDL")
                    {
                        if (Session["BankCode"].ToString() == "240")
                            return View("CheckerForm_240");
                        else
                            return View();
                    }
                    else if (type == "TRF02")
                    {
                        ViewBag.ScanningType = "2";
                        return View("TransferChecker_02");
                    }
                    else if (type == "TRF03" || type == "TRF04" || type == "TRF05" || type == "TRF06" ||
                             type == "TRF07" || type == "TRF08")
                    {
                        if (type == "TRF03")
                            ViewBag.ScanningType = "3";
                        else if (type == "TRF04")
                            ViewBag.ScanningType = "4";
                        else if (type == "TRF05")
                            ViewBag.ScanningType = "5";

                        return View("TransferChecker_03_04_05");
                    }
                    else if (type == "DI01")
                    {
                        ViewBag.ScanningType = "1";
                        return View("DebitCheckerForCash");
                    }
                    else if (type == "DI02" || type == "DI03")
                    {
                        if (type == "DI02")
                            ViewBag.ScanningType = "2";
                        else if (type == "DI03")
                            ViewBag.ScanningType = "3";

                        return View("DebitChecker_02_03");
                    }
                    else if (type == "CI01")
                    {
                        ViewBag.ScanningType = "1";
                        return View("CreditIntimationCheckerCash");
                    }
                    else if (type == "CI02" || type == "CI03" || type == "CI04")
                    {
                        if (type == "CI02")
                            ViewBag.ScanningType = "2";
                        else if (type == "CI03")
                            ViewBag.ScanningType = "3";
                        else if (type == "CI04")
                            ViewBag.ScanningType = "4";

                        return View("CreditIntimationChecker_02_03_04");
                    }
                    else if (type == "RTGS03" || type == "RTGS04")
                    {

                        return View("RTGSChecker_03_04");

                    }
                    else
                        return View();              // no use
                }
                else
                {
                    return View();
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

    }
}