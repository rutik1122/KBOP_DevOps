using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class BankingAPI
    {
        public string get_BankApi_val(string cs, string bankcode)
        {
            try
            {
                DbModel db = new DbModel();
                string Encryption_Key = "";
                if (bankcode == "k_bop")
                {
                    string sql = "SELECT * FROM ibas_apisettings WHERE bankcode='" + bankcode + "'";
                    DataSet ds = db.GetDataSet(cs, sql);

                    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            string apiname = Convert.ToString(ds.Tables[0].Rows[i]["apiname"]);

                            if (apiname == "k_bop_Kval")
                                Encryption_Key = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                        }
                    }
                }
                return Encryption_Key;
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
    }
}