using EM_API.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace EM_API.Controllers
{
    public class ProgressPhotosController : ApiController
    {
        EM_Entities db = new EM_Entities();
        [HttpGet]
        public HttpResponseMessage getProgressPhotos(int userId)
        {
            try
            {
                var result = db.ProgressPhotos.Where(s=>s.uid== userId).Select(s=> new {s.pid,s.photo,s.caption,s.date,s.uid}).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpDelete]
        public HttpResponseMessage deleteProgressPhotos(int id)
        {
            try
            {

                ProgressPhoto p = db.ProgressPhotos.Where(s=>s.pid==id).FirstOrDefault();
                db.ProgressPhotos.Remove(p);
                db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, "Picture Deleted");
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPut]
        public HttpResponseMessage editCaption(ProgressPhoto p)
        {
            try
            {            
                ProgressPhoto pp = db.ProgressPhotos.Where(s => s.pid == p.pid).FirstOrDefault();
                pp.caption = p.caption;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "caption changed");
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        public HttpResponseMessage addProgressPhoto()
        {
            try
            {            
                var form = HttpContext.Current.Request.Form;
                string caption = form["caption"];
                int uid = int.Parse(form["uid"]);
                var files = HttpContext.Current.Request.Files;
                DateTime dt = DateTime.Now;
                string fname = dt.Year + "" + dt.Month + "" + dt.Day + "" + dt.Minute + "" + dt.Second + "" + dt.Hour;
                string path = HttpContext.Current.Server.MapPath("~/Images");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string fileData = null;
                for (int i = 0; i < files.Count; i++)
                {
                    fileData = fname + files[i].FileName;
                    files[i].SaveAs(path + "\\" + fileData);
                }
                ProgressPhoto photo = new ProgressPhoto();
                photo.caption = caption;
                photo.photo = fileData;
                photo.date = DateTime.Now.Date;
                photo.uid = uid;
                db.ProgressPhotos.Add(photo);
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "Photo Added");
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

    }
}
