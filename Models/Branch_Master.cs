using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class Branch_Master
    {
        public int Id { get; set; }

        [Display(Name = "Branch Code")]
        public string Code { get; set; }
        public string Sak_Code { get; set; }

        [Display(Name = "Branch Name")]
        public string Name { get; set; }

        [Display(Name = "Sak Branch Name")]
        public string Sak_Name { get; set; }

        [Display(Name = "Address")]
        public string Address1 { get; set; }
        public string Sak_Address1 { get; set; }

        public string Address2 { get; set; }
        public string Sak_Address2 { get; set; }

        [Display(Name = "IFSC Code")]
        public string IfscCode { get; set; }
        public string Sak_IfscCode { get; set; }

        [Display(Name = "MICR Code")]
        public string MicrCode { get; set; }
        public string Sak_MicrCode { get; set; }
        public string CreatedBy { get; set; }

        [Display(Name = "Domain")]
        public string DomId { get; set; }
        public string Sak_DomId { get; set; }

        [Display(Name = "Scan CutOff Time")]
        public string Scan_cutoffTime { get; set; }
        public string Sak_Scan_cutoffTime { get; set; }
        public string dom { get; set; }
        public int Status { get; set; }
        public int Active { get; set; }
        public string ModifiedBY { get; set; }
        public string ApprovedBY { get; set; }
        public int AllowAccess { get; set; }
        public bool same_code { get; set; }
        public bool same_Name { get; set; }
        public bool same_Add1 { get; set; }
        public bool same_Add2 { get; set; }
        public bool same_IfscCode { get; set; }
        public bool same_micrcode { get; set; }
        public bool same_domid { get; set; }
        public bool same_Scan_cutoffTime { get; set; }
        public string Requestedby { get; set; }
        public string Message { get; set; }
    }
    public class checkerInput
    {
        public string checkerrights { get; set; }
        public string uid { get; set; }

    }
}