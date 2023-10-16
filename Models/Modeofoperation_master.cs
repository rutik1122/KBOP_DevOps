using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class Modeofoperation_master
    {
        public int Id { get; set; }
        [Display(Name = "Reference Code")]
        public string Ref_Code { get; set; }
        [Display(Name = "Description")]
      
        public string Ref_Desc { get; set; }
       
        public string CreatedBy { get; set; }
        public int Status { get; set; }
        public int Active { get; set; }
        public string ModifiedBY { get; set; }
        public string ApprovedBY { get; set; }

    }
}