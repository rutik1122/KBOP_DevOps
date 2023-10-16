using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class Transaction_CTSwise_Presentation
    {

        public string from_date { get; set; }
        public string to_date { get; set; }
        public string tellerid { get; set; }
        public string machineserialno { get; set; }
        public string clearing_type { get; set; }
        public string instrument_type { get; set; }
        public string input_date { get; set; }
        public string payeename { get; set; }
        public string cheqno { get; set; }
        public string sortcode { get; set; }
        public string transcode { get; set; }
        public string note_index { get; set; }
        public string chqamount { get; set; }

        public string sni_id { get; set; }

        public string branch_code { get; set; }

        public string count_id { get; set; }

        public string account_no { get; set; }

        public string report_name { get; set; }

        public string report_type { get; set; }
        public string transaction_refno { get; set; }

        //
        //public string fromDate { get; set; }
    }
}