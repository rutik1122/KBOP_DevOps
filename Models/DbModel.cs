using Microsoft.Ajax.Utilities;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Web;

namespace iBAS.Models
{
    public class DbModel
    {
        public string GetUpdateCount(string ConnectionString, string sQuery)
        {
            int reccount = 0;
            try
            {

                using (var con = new NpgsqlConnection(ConnectionString)) //using connection block start
                {
                    con.Open();

                    using (var tran = con.BeginTransaction()) //Transaction  block start
                    {
                        using (NpgsqlCommand cmd = new NpgsqlCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.CommandText = sQuery;
                            cmd.Connection = con;
                            reccount = cmd.ExecuteNonQuery();
                            tran.Commit();
                            con.Close();
                        }
                    } //transaction block end
                }//using connection block end

                if (reccount > 0)
                    return "SUCCESS|" + reccount;
                else
                    return "FAILED|Update record count is 0!";

            }
            catch (Exception e)
            {


                string sInnerException = "";

                if (e.InnerException != null)
                {
                    sInnerException = e.InnerException.Message.ToString();
                }
                //scanner.WriteErrorLog("GetUpdateCount error : " + e.Message, sInnerException);
                //return reccount;
                return "FAILED|" + e.Message;
            }

        }


        public DataSet GetDataSet(string ConnectionString, string sQuery)
        {
            //scanner.WriteErrorLog("ConnectionString  : " + ConnectionString, "GetDataSet");
            //scanner.WriteErrorLog("sQuery  : " + sQuery, "GetDataSet");
            DataSet ds = new DataSet();
            try
            {
                using (var con = new NpgsqlConnection(ConnectionString)) //using connection block start
                {
                    con.Open();
                    using (var tran = con.BeginTransaction()) //Transaction  block start
                    {
                        using (NpgsqlCommand cmd = con.CreateCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.CommandText = sQuery;
                            using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd))
                            {
                                da.Fill(ds);
                                tran.Commit();
                                con.Close();
                            }
                        }
                    } //transaction block end
                }//using connection block end

                return ds;
            }
            catch (Exception e)
            {
                string sInnerException = "";

                if (e.InnerException != null)
                {
                    sInnerException = e.InnerException.Message.ToString();
                }
                //scanner.WriteErrorLog("GetDataSet error : " + e.Message, sInnerException);
                return ds;
            }
        }

        public bool SessionTime(string starttime, string TimeLimit)
        {
            //user 03    // Set session start time

            if (starttime == null || starttime == "")
                starttime = DateTime.Now.ToString();

            DateTime dt = Convert.ToDateTime(starttime);

            // Check if session has expired
            DateTime startTime = (DateTime)dt;
            TimeSpan elapsed = DateTime.Now - startTime;

            //int sessionDuration = 1; // Session duration in minutes
            int sessionDuration = Convert.ToInt32(TimeLimit); // Session duration in minutes
            
            if (elapsed.TotalMinutes >= sessionDuration)
            {
                // Session expired, invalidate and log out user
                //Session.Abandon();
                return false;
            }
            return true;
        }


        public DataSet GetDataSetFromSP(string ConnectionString, string sQuery)
        {
            //scanner.WriteErrorLog("GetDataSetFromSP : ", "Start");
            DataSet ds = new DataSet();
            try
            {
                int TryCon = 0;
            repeat:
                using (var con = new NpgsqlConnection(ConnectionString)) //using connection block start
                {
                    //    int TryCon = 0;
                    //repeat:
                    try
                    {

                        //scanner.WriteErrorLog("Connection start ", "GetDataSetFromSP : ");
                        con.Open();
                        //scanner.WriteErrorLog("Database connection successfully ", "GetDataSetFromSP : ");
                    }
                    catch (Exception e)
                    {
                        if (e.Message.Contains("Timeout expired"))
                        {
                            //scanner.WriteErrorLog("Database timedout error : " + e.Message.ToString(), "GetDataSetFromSP : ");
                        }
                        else
                        {
                            //scanner.WriteErrorLog("Database connection error : " + e.Message.ToString(), "GetDataSetFromSP : ");
                            //Thread.Sleep(1000);
                            //goto repeat;

                        }

                        if (TryCon < 5)
                        {
                            Thread.Sleep(1000);
                            TryCon = TryCon + 1;
                            //scanner.WriteErrorLog("Database connection try  : " + TryCon.ToString(), "GetDataSetFromSP : ");
                            goto repeat;

                        }


                    }


                    using (var tran = con.BeginTransaction()) //Transaction  block start
                    {
                        string strSql = "";
                        using (NpgsqlCommand cmd = con.CreateCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            // cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = sQuery;
                            object cursorVal = cmd.ExecuteScalar();
                            strSql = "fetch all from \"" + cursorVal + "\";";
                            cmd.Dispose();

                        }

                        using (NpgsqlCommand cmd = con.CreateCommand())
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.CommandText = strSql;
                            using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd))
                            {
                                da.Fill(ds);
                                tran.Commit();
                                cmd.Dispose();
                                con.Close();
                            }

                        }

                    } //transaction block end
                }//using connection block end

                //scanner.WriteErrorLog("GetDataSetFromSP : ", "End");

                return ds;
            }
            catch (Exception e)
            {
                string sInnerException = "";



                if (e.InnerException != null)
                {
                    sInnerException = e.InnerException.Message.ToString();
                }
                //scanner.WriteErrorLog("GetDataSetFromSP error : " + e.Message, sInnerException);

                //scanner.WriteErrorLog("GetDataSetFromSP : ", "End with error! ");

                return ds;
            }


        }
    }
}