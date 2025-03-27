using Freelancers.Data;
using Freelancers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Freelancers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreelancerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FreelancerController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/freelancer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Freelancer>>> GetFreelancers()
        {
            return await _context.Freelancers.ToListAsync();
        }

        // GET: api/freelancer/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Freelancer>> GetFreelancer(int id)
        {
            var freelancer = await _context.Freelancers.FindAsync(id);
            if (freelancer == null)
            {
                return NotFound();
            }
            return freelancer;
        }

        // POST: api/freelancer
        [HttpPost]
        public async Task<ActionResult<Freelancer>> CreateFreelancer(Freelancer freelancer)
        {
            _context.Freelancers.Add(freelancer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFreelancer), new { id = freelancer.Id }, freelancer);
        }

        // PUT: api/freelancer/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFreelancer(int id, Freelancer freelancer)
        {
            if (id != freelancer.Id)
            {
                return BadRequest();
            }

            _context.Entry(freelancer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/freelancer/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFreelancer(int id)
        {
            var freelancer = await _context.Freelancers.FindAsync(id);
            if (freelancer == null)
            {
                return NotFound();
            }

            _context.Freelancers.Remove(freelancer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
