using FinalExamBackend.Data;
using FinalExamBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalExamBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainmentController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;

        public EntertainmentController(EntertainmentAgencyExampleContext context)
        {
            _context = context;
        }

        // GET: api/Entertainment/entertainers
        [HttpGet("entertainers")]
        public async Task<ActionResult<IEnumerable<EntertainerDto>>> GetEntertainers()
        {
            var entertainers = await _context.Entertainers
                .Select(e => new EntertainerDto
                {
                    EntertainerId = e.EntertainerId,
                    EntStageName = e.EntStageName,
                    EntSsn = e.EntSsn,
                    EntStreetAddress = e.EntStreetAddress,
                    EntCity = e.EntCity,
                    EntState = e.EntState,
                    EntZipCode = e.EntZipCode,
                    EntPhoneNumber = e.EntPhoneNumber,
                    EntWebPage = e.EntWebPage,
                    EntEmailAddress = e.EntEmailAddress,
                    DateEntered = e.DateEntered,

                    BookingCount = _context.Engagements.Count(en => en.EntertainerId == e.EntertainerId),
                    LastBookingDate = _context.Engagements
                        .Where(en => en.EntertainerId == e.EntertainerId && en.StartDate != null)
                        .OrderByDescending(en => en.StartDate)
                        .Select(en => en.StartDate)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return entertainers;
        }
        
        [HttpGet("entertainers/{id}")]
        public async Task<ActionResult<EntertainerDto>> GetEntertainerById(int id)
        {
            var entertainer = await _context.Entertainers
                .Where(e => e.EntertainerId == id)
                .Select(e => new EntertainerDto
                {
                    EntertainerId = e.EntertainerId,
                    EntStageName = e.EntStageName,
                    EntSsn = e.EntSsn,
                    EntStreetAddress = e.EntStreetAddress,
                    EntCity = e.EntCity,
                    EntState = e.EntState,
                    EntZipCode = e.EntZipCode,
                    EntPhoneNumber = e.EntPhoneNumber,
                    EntWebPage = e.EntWebPage,
                    EntEmailAddress = e.EntEmailAddress,
                    DateEntered = e.DateEntered,
                    BookingCount = _context.Engagements.Count(en => en.EntertainerId == e.EntertainerId),
                    LastBookingDate = _context.Engagements
                        .Where(en => en.EntertainerId == e.EntertainerId && en.StartDate != null)
                        .OrderByDescending(en => en.StartDate)
                        .Select(en => en.StartDate)
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (entertainer == null)
            {
                return NotFound();
            }

            return entertainer;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Entertainer>> AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            if (newEntertainer == null)
            {
                return BadRequest("Invalid entertainer data.");
            }

            // Optional: Clear the ID if it's accidentally included
            newEntertainer.EntertainerId = 0;

            _context.Entertainers.Add(newEntertainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntertainerById), new { id = newEntertainer.EntertainerId }, newEntertainer);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            if (updated == null || id != updated.EntertainerId)
            {
                return BadRequest("Invalid entertainer data.");
            }

            var existing = await _context.Entertainers.FindAsync(id);
            if (existing == null)
            {
                return NotFound($"Entertainer with ID {id} not found.");
            }

            // Update all fields manually
            existing.EntStageName = updated.EntStageName;
            existing.EntSsn = updated.EntSsn;
            existing.EntStreetAddress = updated.EntStreetAddress;
            existing.EntCity = updated.EntCity;
            existing.EntState = updated.EntState;
            existing.EntZipCode = updated.EntZipCode;
            existing.EntPhoneNumber = updated.EntPhoneNumber;
            existing.EntWebPage = updated.EntWebPage;
            existing.EntEmailAddress = updated.EntEmailAddress;
            existing.DateEntered = updated.DateEntered;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound($"Entertainer with ID {id} not found.");
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 status
        }


    }
}
