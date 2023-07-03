/*using EM_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EM_API.Controllers
{
    public class ExercisesController : ApiController
    {
        EM_Entities db = new EM_Entities();
        [HttpGet]
        public HttpResponseMessage getExrNames()
        {
            var result = db.Exersices.Select(s=>s.name).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]
        public HttpResponseMessage getAllExercises()
        {
            var result = db.Exersices.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]
        public HttpResponseMessage getExercise(string name)
        {
            var result = db.Exersices.Where(s=>s.name==name).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

    }
}
*/