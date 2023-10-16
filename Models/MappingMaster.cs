using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class MappingMaster
    {
        //[Required(ErrorMessage = "Please Enter Branch Code")]
        //[StringLength(10, MinimumLength = 15, ErrorMessage = "Minimum 15 characters required")]
        public string inbranch_code { get; set; }
        public string inmachineserialno { get; set; }

        public string Sorter_Serial_No {get ; set;}

        public string insorter_ip { get; set; }
        
        public string insorter_port { get; set; }

        public string inprinter_ip { get; set; }
    
        public string inprinter_port { get; set; }

        public string inprinter_model { get; set; }
        public string inteller_id { get; set; }

        public string inrecieptprinting { get; set; }

    }
}