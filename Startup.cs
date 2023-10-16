using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(iBAS.Startup))]
namespace iBAS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
