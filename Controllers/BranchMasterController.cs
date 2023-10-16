using iBAS.Models;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OfficeOpenXml.ConditionalFormatting;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace iBAS.Controllers
{
    public class BranchMasterController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();
        string cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;
        // Branch Maker
        public async Task<ActionResult> BranchList()
        {
            try
            {
                logerror("BranchList Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("BranchList Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    //string[] seperateUrl = urlString.Split('?');
                    //NameValueCollection queryString = System.Web.HttpUtility.ParseQueryString(seperateUrl[1]);
                    //queryString["Scanner"] = "Master";
                    //urlString = seperateUrl[0]+"?"+queryString.ToString();

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new StringContent(string.Empty);
                    content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "BranchList", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        List<Branch_Master> branch = JsonConvert.DeserializeObject<List<Branch_Master>>(jsonResponse);
                        return View(branch);
                    }
                    else
                    {
                        return View();
                    }
                }
            }
            catch (Exception ex)
            {
                logerror("BranchList Action Catch", ex.Message);
                return View();
            }
        }


        public ActionResult CreateBranch(int id = 0)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                domlist(id, null);
                //ViewBag.Message = "Created";
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateBranch(Branch_Master model)
        {
            try
            {
                //user04 decryption begin
                var EncRequestData = Request.Form["EncryptedData"];

                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };

                // Serialize the data to JSON (optional)
                string jsonRequestData = JsonConvert.SerializeObject(requestData);
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    //string listvalue = Request.Form["Branch"].ToString();
                    //model.DomId = listvalue;
                    //model.CreatedBy = Convert.ToString(Session["uid"]);
                    ////model.ModifiedBY = Convert.ToString(Session["uid"]);
                    ////model.ApprovedBY = Convert.ToString(Session["uid"]);
                    //var content = new FormUrlEncodedContent(new[]
                    //{
                    //    new KeyValuePair<string,string>("createdby",model.CreatedBy),
                    //     //new KeyValuePair<string,string>("modifiedby",model.ModifiedBY),
                    //      //new KeyValuePair<string,string>("approvedby",model.ApprovedBY),
                    //    new KeyValuePair<string,string>("code",model.Code),
                    //    new KeyValuePair<string,string>("name",model.Name),
                    //    new KeyValuePair<string,string>("address1",model.Address1),
                    //    new KeyValuePair<string,string>("address2",model.Address2),
                    //    new KeyValuePair<string,string>("ifsccode",model.IfscCode),
                    //    new KeyValuePair<string,string>("micrcode",model.MicrCode),
                    //    new KeyValuePair<string,string>("domid",model.DomId),
                    //    new KeyValuePair<string,string>("scan_cutofftime",model.Scan_cutoffTime),
                    //});

                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");//user04
                    HttpResponseMessage response = await client.PostAsync(urlString + "SaveBranchData", content);
                    if (response.IsSuccessStatusCode)
                    {

                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            //user04
                            string resp = decryptdata.Replace("{", "");
                            TempData["success"] = resp;// "Branch Added Successfully";
                            return RedirectToAction("CreateBranch", new { id = 1 });

                            //return View();
                        }

                    }
                    TempData["success"] = "Code Already exist";
                    return RedirectToAction("CreateBranch");
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }


        public async Task<ActionResult> EditBranch(int id, Branch_Master model)
        {
            try
            {
                logerror("EditBranch Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("EditBranch Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Concat(id));


                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "GetBranchData", content).Result;
                    //
                    //domlist(id);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(jsonResponse)));
                        var json2 = sReader2.ReadToEnd();

                        string replaceData = json2.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                        string[] arr = replaceData.Split(',');

                        Branch_Master branchdata = new Branch_Master();

                        for (int i = 0; i < arr.Length; i++)
                        {
                            string str = arr[i];
                            string[] dataSet = str.Split(':');

                            if (dataSet[0].ToUpper() == "ID")
                                branchdata.Id = Convert.ToInt32(dataSet[1]);

                            else if (dataSet[0].ToUpper() == "CODE")
                                branchdata.Code = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "NAME")
                                branchdata.Name = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS1")
                                branchdata.Address1 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS2")
                                branchdata.Address2 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "IFSCCODE")
                                branchdata.IfscCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "MICRCODE")
                                branchdata.MicrCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "CREATEDBY")
                                branchdata.CreatedBy = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOMID")
                                branchdata.DomId = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SCAN_CUTOFFTIME")
                                branchdata.Scan_cutoffTime = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOM")
                                branchdata.dom = dataSet[1].ToString();

                        }

                        //Branch_Master branch = JsonConvert.DeserializeObject<Branch_Master>(jsonResponse);
                        //branch.dom = branch.DomId;
                        domlist(id, branchdata.DomId);
                        return View(branchdata);
                    }

                    //ViewBag.domain = id.ToString();
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> EditBranch(Branch_Master model)
        {
            try
            {
                logerror("Editbranch api calling start", "EditBranch");
                //user04 decryption begin
                var EncRequestData = Request.Form["EncryptedData"];
                logerror("Encrypted Data", EncRequestData);
                //AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();

                //BankingAPI bankingAPI = new BankingAPI();
                //string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                //var decryptdata = callObj.DecryptJsonData(EncRequestData, key);
                //var JsonRequestData = JsonConvert.DeserializeObject<Branch_Master>(decryptdata);
                //model = JsonRequestData;

                //return RedirectToAction("BranchList");


                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };

                // Serialize the data to JSON (optional)
                string jsonRequestData = JsonConvert.SerializeObject(requestData);
                logerror("Encrypted Data in json", jsonRequestData);
                using (HttpClient client = new HttpClient())
                {
                    logerror("Inside using", "EditBranch");
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
                    logerror("After Certificte", "EditBranch");
                    urlString = urlString.Replace("Scanner", "Master");
                    logerror("URL", urlString);
                    //string listvalue = Request.Form["Branch"].ToString();
                    //model.DomId = listvalue;
                    //model.CreatedBy = Convert.ToString(Session["uid"]);
                    //model.ModifiedBY = Convert.ToString(Session["uid"]);
                    //var content = new FormUrlEncodedContent(new[]
                    //{
                    //    new KeyValuePair<string,string>("createdby",model.CreatedBy),
                    //    new KeyValuePair<string,string>("modifiedby",model.ModifiedBY),
                    //    new KeyValuePair<string,string>("id",Convert.ToString(model.Id)),
                    //    new KeyValuePair<string,string>("code",model.Code),
                    //    new KeyValuePair<string,string>("name",model.Name),
                    //    new KeyValuePair<string,string>("address1",model.Address1),
                    //    new KeyValuePair<string,string>("address2",model.Address2),
                    //    new KeyValuePair<string,string>("ifsccode",model.IfscCode),
                    //    new KeyValuePair<string,string>("micrcode",model.MicrCode),
                    //    new KeyValuePair<string,string>("domid",model.DomId),
                    //    new KeyValuePair<string,string>("scan_cutofftime",model.Scan_cutoffTime),
                    //});

                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
                    logerror("Content", content.ToString());
                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateBranchData", content);
                    logerror("UpdateBranchData Api Response", response.ToString());
                    //domlist();
                    if (response.IsSuccessStatusCode)
                    {
                        logerror("SUccessful Response", "EditBranch");
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            string resp = decryptdata.Replace("{", "");
                            logerror("Response", resp);
                            TempData["success"] = resp;// "Branch Updated";
                            //return View();
                            return RedirectToAction("BranchList");
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


        public ActionResult Delete(Branch_Master model)
        {
            try
            {
                //user04 decryption begin
                var EncRequestData = Request.Form["EncryptedData"];

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Empty);
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id)),
                        new KeyValuePair<string,string>("status",model.Status.ToString()),
                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "DeleteBranch", content).Result;
                    //HttpResponseMessage response = client.PostAsync(urlString + "RejectBranchData", content).Result; 
                    if (response.IsSuccessStatusCode)
                    {
                        TempData["success"] = "Request Rejected";
                        return RedirectToAction("BranchListChecker");
                    }
                    return RedirectToAction("BranchListChecker");
                }

            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }



        public async Task<ActionResult> BranchListChecker()
        {
            try
            {
                logerror("BranchList Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("BranchList Action", "Ending");

                checkerInput checkerInputdata = new checkerInput();

                string loginid = Session["uid"].ToString();
                string checkerRights = Session["branchmasterchecker"].ToString();
                checkerInputdata.uid = loginid;
                checkerInputdata.checkerrights = checkerRights;

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    //domlist(id, null);

                    //var content = new StringContent(string.Empty);

                    var jsonSerialNo = JsonConvert.SerializeObject(checkerInputdata);
                    var content = new StringContent(jsonSerialNo, Encoding.UTF8, "application/json");
                    content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "BranchListChecker", content).Result;
                    if (response.IsSuccessStatusCode)
                    {

                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        List<Branch_Master> branchchecker = JsonConvert.DeserializeObject<List<Branch_Master>>(jsonResponse);
                        return View(branchchecker);
                    }
                    else
                    {
                        return View("Error");
                    }
                }
            }
            catch (Exception ex)
            {
                logerror("BranchList Action Catch", ex.Message);
                return View();
            }
        }

        public async Task<ActionResult> BranchChecker(int id, Branch_Master model)// accept and reject for create request
        {
            try
            {
                logerror("EditBranch Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("EditBranch Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Concat(id));


                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "GetBranchData", content).Result;
                    //
                    //domlist(id);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(jsonResponse)));
                        var json2 = sReader2.ReadToEnd();

                        string replaceData = json2.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                        string[] arr = replaceData.Split(',');

                        Branch_Master branchdata = new Branch_Master();

                        for (int i = 0; i < arr.Length; i++)
                        {
                            string str = arr[i];
                            string[] dataSet = str.Split(':');

                            if (dataSet[0].ToUpper() == "ID")
                                branchdata.Id = Convert.ToInt32(dataSet[1]);

                            else if (dataSet[0].ToUpper() == "CODE")
                                branchdata.Code = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "NAME")
                                branchdata.Name = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS1")
                                branchdata.Address1 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS2")
                                branchdata.Address2 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "IFSCCODE")
                                branchdata.IfscCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "MICRCODE")
                                branchdata.MicrCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "CREATEDBY")
                                branchdata.CreatedBy = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOMID")
                                branchdata.DomId = dataSet[1].ToString();

                            //Scan_cutoffTime
                            else if (dataSet[0].ToUpper() == "SCAN_CUTOFFTIME")
                                branchdata.Scan_cutoffTime = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOM")
                                branchdata.dom = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "STATUS")
                                branchdata.Status = Convert.ToInt32(dataSet[1]);
                        }

                        domlist(id, branchdata.DomId);
                        return View(branchdata);
                    }

                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("BranchChecker Action Catch", ex.Message);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> BranchChecker(Branch_Master model)
        {
            try
            {
                //user04 decryption begin
                var EncRequestData = Request.Form["EncryptedData"];
                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };

                // Serialize the data to JSON (optional)
                string jsonRequestData = JsonConvert.SerializeObject(requestData);

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    //string listvalue = Request.Form["Branch"].ToString();
                    //model.DomId = listvalue;
                    //model.CreatedBy = Convert.ToString(Session["uid"]);
                    //model.ModifiedBY = Convert.ToString(Session["uid"]);
                    //model.ApprovedBY = Convert.ToString(Session["uid"]);
                    //var content = new FormUrlEncodedContent(new[]
                    //{
                    //    //new KeyValuePair<string,string>("createdby",model.CreatedBy),
                    //    new KeyValuePair<string,string>("approvedby",model.ApprovedBY),
                    //    new KeyValuePair<string,string>("id",Convert.ToString(model.Id)),
                    //    new KeyValuePair<string,string>("code",model.Code),
                    //    new KeyValuePair<string,string>("name",model.Name),
                    //    new KeyValuePair<string,string>("address1",model.Address1),
                    //    new KeyValuePair<string,string>("address2",model.Address2),
                    //    new KeyValuePair<string,string>("ifsccode",model.IfscCode),
                    //    new KeyValuePair<string,string>("micrcode",model.MicrCode),
                    //    new KeyValuePair<string,string>("domid",model.DomId),
                    //    new KeyValuePair<string,string>("scan_cutofftime",model.Scan_cutoffTime),
                    //    new KeyValuePair<string,string>("status",model.Status.ToString()),

                    //});

                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(urlString + "AcceptBranchData", content);
                    //domlist();
                    if (response.IsSuccessStatusCode)
                    {

                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            string resp = decryptdata.Replace("{", "");
                            TempData["success"] = resp;// "Request Accepted Successfully";


                            return RedirectToAction("BranchListChecker");
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

        public async Task<ActionResult> EditBranchChecker(int id, Branch_Master model) // accept and reject for eidt request
        {
            try
            {
                logerror("EditBranch Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("EditBranchChecker Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Concat(id));


                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "GetBranchDataSAK", content).Result;
                    //
                    //domlist(id);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(jsonResponse)));
                        var json2 = sReader2.ReadToEnd();

                        string replaceData = json2.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                        string[] arr = replaceData.Split(',');

                        Branch_Master branchdata = new Branch_Master();

                        for (int i = 0; i < arr.Length; i++)
                        {
                            string str = arr[i];
                            string[] dataSet = str.Split(':');

                            if (dataSet[0].ToUpper() == "ID")
                                branchdata.Id = Convert.ToInt32(dataSet[1]);

                            else if (dataSet[0].ToUpper() == "SAK_CODE")
                                branchdata.Sak_Code = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_NAME")
                                branchdata.Sak_Name = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_ADDRESS1")
                                branchdata.Sak_Address1 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_ADDRESS2")
                                branchdata.Sak_Address2 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_IFSCCODE")
                                branchdata.Sak_IfscCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_MICRCODE")
                                branchdata.Sak_MicrCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_DOMID")
                                branchdata.Sak_DomId = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAK_SCAN_CUTOFFTIME")
                                branchdata.Sak_Scan_cutoffTime = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SAME_CODE")
                                branchdata.same_code = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_NAME")
                                branchdata.same_Name = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_ADD1")
                                branchdata.same_Add1 = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_ADD2")
                                branchdata.same_Add2 = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_IFSCCODE")
                                branchdata.same_IfscCode = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_MICRCODE")
                                branchdata.same_micrcode = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_DOMID")
                                branchdata.same_domid = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "SAME_SCAN_CUTOFFTIME")
                                branchdata.same_Scan_cutoffTime = Convert.ToBoolean(dataSet[1].ToString());

                            else if (dataSet[0].ToUpper() == "STATUS")
                                branchdata.Status = Convert.ToInt32(dataSet[1]);
                        }

                        //Branch_Master branch = JsonConvert.DeserializeObject<Branch_Master>(jsonResponse);
                        //branch.dom = branch.DomId;
                        domlist(id, branchdata.DomId);
                        return View(branchdata);
                    }

                    //ViewBag.domain = id.ToString();
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> EditBranchChecker(Branch_Master model)
        {
            try
            {
                var EncRequestData = Request.Form["EncryptedData"];
                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };

                // Serialize the data to JSON (optional)
                string jsonRequestData = JsonConvert.SerializeObject(requestData);

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    //string listvalue = Request.Form["Branch"].ToString();
                    //model.DomId = listvalue;
                    //model.CreatedBy = Convert.ToString(Session["uid"]);
                    ////model.ModifiedBY = Convert.ToString(Session["uid"]);
                    //model.ApprovedBY = Convert.ToString(Session["uid"]);
                    //var content = new FormUrlEncodedContent(new[]
                    //{
                    //    new KeyValuePair<string,string>("createdby",model.CreatedBy),
                    //    //new KeyValuePair<string,string>("modifiedby",model.ModifiedBY),
                    //    new KeyValuePair<string,string>("approvedby",model.ApprovedBY),
                    //    new KeyValuePair<string,string>("id",Convert.ToString(model.Id)),
                    //    new KeyValuePair<string,string>("code",model.Code),
                    //    new KeyValuePair<string,string>("sak_code",model.Sak_Code),
                    //    new KeyValuePair<string,string>("name",model.Name),
                    //    new KeyValuePair<string,string>("sak_name",model.Sak_Name),
                    //    new KeyValuePair<string,string>("address1",model.Address1),
                    //    new KeyValuePair<string,string>("sak_address1",model.Sak_Address1),
                    //    new KeyValuePair<string,string>("address2",model.Address2),
                    //    new KeyValuePair<string,string>("sak_address2",model.Sak_Address2),
                    //    new KeyValuePair<string,string>("ifsccode",model.IfscCode),
                    //    new KeyValuePair<string,string>("sak_ifsccode",model.Sak_IfscCode),
                    //    new KeyValuePair<string,string>("micrcode",model.MicrCode),
                    //    new KeyValuePair<string,string>("sak_micrcode",model.Sak_MicrCode),
                    //    new KeyValuePair<string,string>("domid",model.DomId),
                    //    new KeyValuePair<string,string>("sak_domid",model.Sak_DomId),
                    //    //new KeyValuePair<string,string>("Sak_DomId",model.Sak_DomId),
                    //    new KeyValuePair<string,string>("scan_cutofftime",model.Scan_cutoffTime),
                    //    new KeyValuePair<string,string>("sak_scan_cutofftime",model.Sak_Scan_cutoffTime),
                    //});

                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateBranchDataSAK", content);
                    //domlist();
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            string resp = decryptdata.Replace("{", "");
                            TempData["success"] = resp;// "Request Accepted Successfully";
                            //return View();
                            return RedirectToAction("BranchListChecker");
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


        public async Task<ActionResult> DeleteBranchChecker(int id, Branch_Master model) // For Delete Branch Checker 
        {
            try
            {
                logerror("DeleteBranchChecker Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("DeleteBranchChecker Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Concat(id));


                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "GetDeleteBranchhecker", content).Result;
                    //
                    //domlist(id);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(jsonResponse)));
                        var json2 = sReader2.ReadToEnd();

                        string replaceData = json2.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                        string[] arr = replaceData.Split(',');

                        Branch_Master branchdata = new Branch_Master();

                        for (int i = 0; i < arr.Length; i++)
                        {
                            string str = arr[i];
                            string[] dataSet = str.Split(':');

                            if (dataSet[0].ToUpper() == "ID")
                                branchdata.Id = Convert.ToInt32(dataSet[1]);

                            else if (dataSet[0].ToUpper() == "CODE")
                                branchdata.Code = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "NAME")
                                branchdata.Name = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS1")
                                branchdata.Address1 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS2")
                                branchdata.Address2 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "IFSCCODE")
                                branchdata.IfscCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "MICRCODE")
                                branchdata.MicrCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "CREATEDBY")
                                branchdata.CreatedBy = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOMID")
                                branchdata.DomId = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SCAN_CUTOFFTIME")
                                branchdata.Scan_cutoffTime = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOM")
                                branchdata.dom = dataSet[1].ToString();



                        }

                        //Branch_Master branch = JsonConvert.DeserializeObject<Branch_Master>(jsonResponse);
                        //branch.dom = branch.DomId;
                        domlist(id, branchdata.DomId);
                        return View(branchdata);
                    }

                    //ViewBag.domain = id.ToString();
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }

        //[HttpPost]
        //public async Task<ActionResult> DeleteBranchChecker(int id, Branch_Master model, string a)
        //{
        //    try
        //    {
        //        using (HttpClient client = new HttpClient())
        //        {
        //            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
        //            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

        //            urlString = urlString.Replace("Scanner", "Master");
        //            model.CreatedBy = Convert.ToString(Session["uid"]);
        //            model.ModifiedBY = Convert.ToString(Session["uid"]);
        //            //var content = new StringContent(string.Empty);
        //            //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
        //            var content = new FormUrlEncodedContent(new[]
        //            {
        //                new KeyValuePair<string, string>("id",Convert.ToString(model.Id)),
        //                 new KeyValuePair<string,string>("createdby",model.CreatedBy),
        //                new KeyValuePair<string,string>("modifiedby",model.ModifiedBY),
        //            });
        //            HttpResponseMessage response = client.PostAsync(urlString + "deletebranchchecker", content).Result;

        //            if (response.IsSuccessStatusCode)
        //            {
        //                string jsonResponse = await response.Content.ReadAsStringAsync();
        //                if (jsonResponse != null)
        //                {
        //                    TempData["success"] = "Branch Deleted";
        //                    return RedirectToAction("BranchList");
        //                }

        //            }
        //            return View();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        logerror("EditBranch Action Catch", ex.Message);
        //        return View();
        //    }
        //}

        [HttpPost]
        public async Task<ActionResult> DeleteBranchChecker(Branch_Master model)
        {
            try
            {
                //user04 decryption begin
                var EncRequestData = Request.Form["EncryptedData"];

                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };

                // Serialize the data to JSON (optional)
                string jsonRequestData = JsonConvert.SerializeObject(requestData);

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.CreatedBy = Convert.ToString(Session["uid"]);
                    //model.ModifiedBY = Convert.ToString(Session["uid"]);
                    ////var content = new StringContent(string.Empty);
                    ////content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    //var content = new FormUrlEncodedContent(new[]
                    //{
                    //    new KeyValuePair<string, string>("id",Convert.ToString(model.Id)),
                    //     new KeyValuePair<string,string>("createdby",model.CreatedBy),
                    //    new KeyValuePair<string,string>("modifiedby",model.ModifiedBY),
                    //});

                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "deletebranchchecker", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            string resp = decryptdata.Replace("{", "");
                            TempData["success"] = resp;//"Branch Deleted";
                            return RedirectToAction("BranchList");
                        }

                    }
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }

        public async Task<ActionResult> DeleteWithReject(int id, Branch_Master model) // For Delete Branch Checker with accept and reject

        {
            try
            {
                logerror("DeleteBranchChecker Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("DeleteBranchChecker Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                     {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });

                    HttpResponseMessage response = client.PostAsync(urlString + "GetDeleteBranchhecker", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(jsonResponse)));
                        var json2 = sReader2.ReadToEnd();

                        string replaceData = json2.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                        string[] arr = replaceData.Split(',');

                        Branch_Master branchdata = new Branch_Master();

                        for (int i = 0; i < arr.Length; i++)
                        {
                            string str = arr[i];
                            string[] dataSet = str.Split(':');

                            if (dataSet[0].ToUpper() == "ID")
                                branchdata.Id = Convert.ToInt32(dataSet[1]);

                            else if (dataSet[0].ToUpper() == "CODE")
                                branchdata.Code = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "NAME")
                                branchdata.Name = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS1")
                                branchdata.Address1 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS2")
                                branchdata.Address2 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "IFSCCODE")
                                branchdata.IfscCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "MICRCODE")
                                branchdata.MicrCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "CREATEDBY")
                                branchdata.CreatedBy = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOMID")
                                branchdata.DomId = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SCAN_CUTOFFTIME")
                                branchdata.Scan_cutoffTime = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOM")
                                branchdata.dom = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "STATUS")
                                branchdata.Status = Convert.ToInt32(dataSet[1]);

                        }

                        //Branch_Master branch = JsonConvert.DeserializeObject<Branch_Master>(jsonResponse);
                        //branch.dom = branch.DomId;
                        domlist(id, branchdata.DomId);
                        return View(branchdata);
                    }

                    //ViewBag.domain = id.ToString();
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("DeleteBranchChecker Action Catch", ex.Message);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> DeleteWithReject(Branch_Master model)
        {
            try
            {
                var EncRequestData = Request.Form["EncryptedData"];
                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };

                // Serialize the data to JSON (optional)
                string jsonRequestData = JsonConvert.SerializeObject(requestData);
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.CreatedBy = Convert.ToString(Session["uid"]);
                    //model.ApprovedBY = Convert.ToString(Session["uid"]);
                    ////var content = new StringContent(string.Empty);
                    ////content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    //var content = new FormUrlEncodedContent(new[]
                    //{
                    //    new KeyValuePair<string, string>("id",Convert.ToString(model.Id)),
                    //     new KeyValuePair<string,string>("createdby",model.CreatedBy),
                    //    new KeyValuePair<string,string>("approvedby",model.ApprovedBY),
                    //});
                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "deleteforreject", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            string resp = decryptdata.Replace("{", "");
                            TempData["success"] = resp;// "Request Accepted Successfully";
                            return RedirectToAction("BranchListChecker");
                        }

                    }
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }

        public async Task<ActionResult> Details(int id, Branch_Master model)
        {
            try
            {
                logerror("Details Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("Details Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Concat(id));


                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "GetBranchData", content).Result;
                    //
                    //domlist(id);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(jsonResponse)));
                        var json2 = sReader2.ReadToEnd();

                        string replaceData = json2.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                        string[] arr = replaceData.Split(',');

                        Branch_Master branchdata = new Branch_Master();

                        for (int i = 0; i < arr.Length; i++)
                        {
                            string str = arr[i];
                            string[] dataSet = str.Split(':');

                            if (dataSet[0].ToUpper() == "ID")
                                branchdata.Id = Convert.ToInt32(dataSet[1]);

                            else if (dataSet[0].ToUpper() == "CODE")
                                branchdata.Code = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "NAME")
                                branchdata.Name = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS1")
                                branchdata.Address1 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "ADDRESS2")
                                branchdata.Address2 = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "IFSCCODE")
                                branchdata.IfscCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "MICRCODE")
                                branchdata.MicrCode = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "CREATEDBY")
                                branchdata.CreatedBy = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOMID")
                                branchdata.DomId = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "SCAN_CUTOFFTIME")
                                branchdata.Scan_cutoffTime = dataSet[1].ToString();

                            else if (dataSet[0].ToUpper() == "DOM")
                                branchdata.dom = dataSet[1].ToString();

                        }

                        //Branch_Master branch = JsonConvert.DeserializeObject<Branch_Master>(jsonResponse);
                        //branch.dom = branch.DomId;
                        domlist(id, branchdata.DomId);
                        return View(branchdata);
                    }

                    //ViewBag.domain = id.ToString();
                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("Details Action Catch", ex.Message);
                return View();
            }
        }



        public List<Branch_Master> domlist(int id, string name)
        {
            try
            {
                urlString = urlString.Replace("Scanner", "Master");
                //var content = id;

                Branch_Master model = new Branch_Master();
                model.Id = id;
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("selected_id",Convert.ToString(model.Id))
                });
                string inputJson = (new JavaScriptSerializer()).Serialize(content);
                WebClient client = new WebClient();
                client.Headers["Content-type"] = "application/json";
                string json = client.UploadString(urlString + "GetDomainList", inputJson);

                string wqe = null;

                StreamReader sReader2 = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(json)));
                var json2 = sReader2.ReadToEnd();
                var data = JArray.Parse(json2);
                ICollection c = json2.ToList();

                List<Branch_Master> domain = new List<Branch_Master>();
                List<SelectListItem> dom = new List<SelectListItem>();

                foreach (var dict in data)
                {
                    string arrData = dict.ToString();
                    string replaceData = arrData.Replace("\"", "").Replace("\n", "").Replace("\r", "").Replace("{", "").Replace("}", "");

                    string[] arr = replaceData.Split(',');

                    Branch_Master br = new Branch_Master();

                    for (int i = 0; i < arr.Length; i++)
                    {
                        string str = arr[i];
                        string[] dataSet = str.Split(':');

                        if (dataSet[0].ToUpper().Trim() == "ID")
                            br.Id = Convert.ToInt32(dataSet[1]);
                        else if (dataSet[0].ToUpper().Trim() == "NAME")
                            br.Name = dataSet[1].ToString().Trim();

                        //br.DomId = dataSet[1].ToString().Trim();


                    }
                    domain.Add(br);

                    bool selectedDom = false;
                    if (name == br.Name)
                    {
                        selectedDom = true;
                        ViewBag.selectedDomainId = br.Id;
                    }
                    dom.Add(new SelectListItem
                    {
                        Text = br.Name,
                        Value = br.Id.ToString(),
                        Selected = selectedDom

                    });
                }


                ViewBag.Branch = dom;
                logerror("View Bag Branch", dom.Count().ToString());
                ViewBag.selectedDomain = name;


                return domain;
            }
            catch (Exception ex)
            {
                List<Branch_Master> domain = new List<Branch_Master>();
                return domain;
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