using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class AccessLevel
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
    }

    public class OrgAccessLevel
    {
        public Int64 OrgnizationID { get; set; }
        public string OrgnizationName { get; set; }
    }

    public class CustAccessLevel
    {
        public Int64 CustomerID { get; set; }
        public string CustomerName { get; set; }
    }

    public class DomAccessLevel
    {
        public Int64 DomainID { get; set; }
        public string DomainName { get; set; }
    }

    public class BranchAccessLevel
    {
        public Int64 BranchID { get; set; }
        public string BranchName { get; set; }
    }
}