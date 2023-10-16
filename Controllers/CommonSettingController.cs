using iBAS.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class CommonSettingController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: CommonSetting
        public async Task<ActionResult> SettingList()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new StringContent(string.Empty);

                    content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "CommonSettingList", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        List<CommonSettingMaster> settings = JsonConvert.DeserializeObject<List<CommonSettingMaster>>(jsonResponse);
                        return View(settings);
                    }
                }

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public async Task<ActionResult> Edit(int id)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("id", Convert.ToString(id))
                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "GetCommonSettingData", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        CommonSettingMaster settings = JsonConvert.DeserializeObject<CommonSettingMaster>(jsonResponse);

                        return View(settings);
                    }
                    return View();
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Edit(CommonSettingMaster model)
        {
            var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;
            try
            {
                //var appname = Request.Form["AppName"];
                //var settval = Request.Form["SettingValue"];

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("id",Convert.ToString(model.Id)),
                        new KeyValuePair<string,string>("appname",model.AppName),
                        new KeyValuePair<string,string>("settingname",model.SettingName),
                        new KeyValuePair<string,string>("settingvalue",model.SettingValue),
                    });
                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateSettingsData", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            DbModel db = new DbModel();
                            string sql1 = " select * from ibas_commonsettings where appname='" + model.AppName + "' and settingname='" + model.SettingName + "'";
                            DataSet ds = db.GetDataSet(cs, sql1);

                            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                            {
                                if (model.AppName == "IBASCONFIG" && model.SettingName == "CheckerModule")
                                    Session["CheckerModule"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["CheckerModule"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "CheckerModule_L3")
                                    Session["CheckerModule_L3"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["CheckerModule_L3"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "PanValidation")
                                    Session["Pancard_Verf"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["Pancard_Verf"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "AccNoMinLength")
                                    Session["AccNoMinLength"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]);
                                else
                                    Session["AccNoMinLength"] = "5";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "AccNoMaxLength")
                                    Session["AccNoMaxLength"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]);
                                else
                                    Session["AccNoMaxLength"] = "5";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "AccBalanceValidation")
                                    Session["AccBalanceValidation"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["AccBalanceValidation"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "NRE_Flag")
                                    Session["NRE_Flag"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["NRE_Flag"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "NRE_Flag_Allow_Trans")
                                    Session["NRE_Flag_Allow_Trans"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["NRE_Flag_Allow_Trans"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "DotAccNo")
                                    Session["DotAccNo"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["DotAccNo"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "Rollback")
                                    Session["RollbackCall"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                                else
                                    Session["RollbackCall"] = "N";

                                if (model.AppName == "IBASCONFIG" && model.SettingName == "Session_Time_Min")
                                    Session["Session_Time_Min"] = Convert.ToString(ds.Tables[0].Rows[0]["settingvalue"]);
                                else
                                    Session["Session_Time_Min"] = "20";

                            }
                            TempData["success"] = "Updated";
                            return View();
                        }
                    }
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }
    }
}