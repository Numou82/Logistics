document.getElementById('complaintForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const ticketId = 'TCK-' + Math.floor(100000 + Math.random() * 900000);
  const location = document.getElementById('location').value;
  const reportedBy = document.getElementById('reportedBy').value;
  
  const statusMsg = document.getElementById('statusMessage');
  statusMsg.className = 'status-msg success';
  statusMsg.innerHTML = `<strong>Ticket Submitted!</strong><br>Ticket ID: ${ticketId} registered for ${location}. Our dispatch team has been notified.`;
  
  // Reset form
  document.getElementById('complaintForm').reset();
});
