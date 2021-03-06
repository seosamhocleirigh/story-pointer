using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using story_pointer.Hubs;
using System;
using System.Timers;

namespace story_pointer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime hostApplicationLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<VoteHub>("/vote");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            //Action<object, ElapsedEventArgs> elapsedAcion = (object sender, ElapsedEventArgs e) => {
            //    var chatHub = (IHubContext<ChatHub>)app.ApplicationServices.GetService(typeof(IHubContext<ChatHub>));
            //};

            hostApplicationLifetime.ApplicationStarted.Register(() =>
            {
                var serviceProvider = app.ApplicationServices;
                var chatHub = (IHubContext<VoteHub>)serviceProvider.GetService(typeof(IHubContext<VoteHub>));
                var timer = new Timer(1000)
                {
                    Enabled = true
                };
                timer.Elapsed += delegate (object sender, ElapsedEventArgs e)
                {
                    chatHub.Clients.All.SendAsync("setTime", DateTime.Now.ToString("dddd d MMMM yyyy HH:mm:ss"));
                };
                timer.Start();
            });
        }
    }
}
