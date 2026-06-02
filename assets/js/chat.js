/* ==========================================================================
   Laxmi Hospital, Firozabad - Live Chat Simulator
   Simulates real-time clinical assistance, triage, and patient guidance
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();
});

const CHAT_KEYWORDS = {
  emergency: "🚨 <strong>EMERGENCY CONTACTS:</strong><br>For immediate trauma, ICU, or ambulance support, please call our 24x7 Emergency Line: <strong>+91 99999 99999</strong> or <strong>+91 5612 244444</strong>. Do not wait!",
  ambulance: "🚑 <strong>AMBULANCE SERVICE:</strong><br>Laxmi Hospital has a fleet of advanced life-support (ALS) ambulances stationed throughout Firozabad. Call <strong>+91 99999 88888</strong> for instant dispatch (0-minute delay target).",
  gynecologist: "🤰 <strong>GYNECOLOGY DEPARTMENT:</strong><br>Led by <strong>Dr. Sneha Singh (M.S. Obs & Gynae)</strong>, the best gynecologist in Firozabad. We specialize in painless deliveries, high-risk pregnancies, and infertility treatments. Book a slot <a href='appointment.html' style='color:var(--primary);text-decoration:underline;font-weight:700;'>here</a>.",
  orthopedic: "🦴 <strong>ORTHOPEDICS & TRAUMA:</strong><br>Our senior orthopedic surgeon, <strong>Dr. Amit Gupta (M.S. Ortho)</strong>, specializes in joint replacements, fracture repairs, arthritis, and keyhole surgeries. View his profile <a href='doctors/dr-amit-gupta.html' style='color:var(--primary);text-decoration:underline;font-weight:700;'>here</a>.",
  pediatric: "👶 <strong>PEDIATRIC CARE:</strong><br>Our child specialist, <strong>Dr. Priya Bansal (M.D. Ped)</strong>, offers newborn checkups, immunizations, and asthma care. View child care tips in our blog <a href='blog/child-health-tips.html' style='color:var(--primary);text-decoration:underline;font-weight:700;'>here</a>.",
  appointment: "📅 <strong>BOOKING APPOINTMENTS:</strong><br>You can book an appointment in 60 seconds! Use our <a href='appointment.html' style='color:var(--primary);text-decoration:underline;font-weight:700;'>Online Booking Form</a>. Choose your department and physician to lock your slot.",
  location: "📍 <strong>HOSPITAL ADDRESS:</strong><br>Laxmi Hospital is located at: <strong>Near Bypass Road, Firozabad, Uttar Pradesh, 283203, India</strong>. Visit our <a href='contact.html' style='color:var(--primary);text-decoration:underline;font-weight:700;'>Contact Page</a> for the Google Maps direction.",
  pricing: "💳 <strong>HEALTH PACKAGES:</strong><br>We offer full body checkups starting from ₹1,499. Check out our customizable Health Packages <a href='index.html#health-packages' style='color:var(--primary);text-decoration:underline;font-weight:700;'>here</a>.",
  dengue: "🦟 <strong>DENGUE SYMPTOMS & TREATMENT:</strong><br>Dengue is common in UP. Symptoms include high fever, joint pain, skin rashes, and low platelets. Please read our clinical guide in our <a href='blog/dengue-symptoms.html' style='color:var(--primary);text-decoration:underline;font-weight:700;'>Dengue Blog</a> or book a medicine slot immediately.",
  default: "Thank you for contacting Laxmi Hospital Care Line. 😊 How can I help you today? You can ask about our:<br>• <strong>'emergency'</strong> services<br>• <strong>'gynecologist'</strong> or <strong>'orthopedic'</strong> doctors<br>• <strong>'location'</strong> or <strong>'appointment'</strong> details."
};

function initChatWidget() {
  const chatToggle = document.getElementById('chat-toggle-btn');
  const chatClose = document.getElementById('chat-widget-close');
  const chatWidget = document.getElementById('chat-widget-panel');
  const chatInput = document.getElementById('chat-widget-input');
  const chatSend = document.getElementById('chat-widget-send');
  const chatMessages = document.getElementById('chat-widget-messages');
  const chatOptions = document.querySelectorAll('.chat-option');
  
  if (!chatWidget) return;
  
  // Toggle panel visibility
  if (chatToggle) {
    chatToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      chatWidget.classList.toggle('active');
      
      // Send welcoming bot message if empty
      if (chatMessages && chatMessages.children.length === 0) {
        sendBotMessage("Hello! Welcome to the Laxmi Hospital Digital Desk. I am your health assistant. 🏥<br><br>Select a quick action below or type a query (e.g., 'gynecologist', 'emergency', 'location') to begin.");
      }
    });
  }
  
  if (chatClose) {
    chatClose.addEventListener('click', () => {
      chatWidget.classList.remove('active');
    });
  }
  
  // Close chat when clicking outside the panel
  document.addEventListener('click', (e) => {
    if (chatWidget.classList.contains('active') && 
        !chatWidget.contains(e.target) && 
        (!chatToggle || !chatToggle.contains(e.target))) {
      chatWidget.classList.remove('active');
    }
  });
  
  // Quick options trigger
  chatOptions.forEach(option => {
    option.addEventListener('click', () => {
      const keyword = option.getAttribute('data-value');
      const optionText = option.textContent;
      
      sendUserMessage(optionText);
      simulateBotTyping(keyword);
    });
  });
  
  // Manual input send
  if (chatSend && chatInput) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      
      sendUserMessage(text);
      chatInput.value = '';
      
      // Analyze search keywords
      const query = text.toLowerCase();
      let matchedKeyword = 'default';
      
      for (let key in CHAT_KEYWORDS) {
        if (query.includes(key)) {
          matchedKeyword = key;
          break;
        }
      }
      
      simulateBotTyping(matchedKeyword);
    };
    
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}

function sendUserMessage(text) {
  const chatMessages = document.getElementById('chat-widget-messages');
  if (!chatMessages) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg msg-user';
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  scrollChatToBottom();
}

function sendBotMessage(htmlContent) {
  const chatMessages = document.getElementById('chat-widget-messages');
  if (!chatMessages) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'msg msg-bot';
  msgDiv.innerHTML = htmlContent;
  chatMessages.appendChild(msgDiv);
  scrollChatToBottom();
}

function simulateBotTyping(keyword) {
  const chatMessages = document.getElementById('chat-widget-messages');
  if (!chatMessages) return;
  
  // Create typing placeholder
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg msg-bot typing-placeholder';
  typingDiv.innerHTML = `<span style="display:inline-block;animation:flash 1s infinite;">•</span> <span style="display:inline-block;animation:flash 1s infinite 0.2s;">•</span> <span style="display:inline-block;animation:flash 1s infinite 0.4s;">•</span> Triage Assistant Typing...`;
  chatMessages.appendChild(typingDiv);
  scrollChatToBottom();
  
  // Simulated clinical thinking delay (800ms)
  setTimeout(() => {
    typingDiv.remove();
    const reply = CHAT_KEYWORDS[keyword] || CHAT_KEYWORDS['default'];
    sendBotMessage(reply);
  }, 800);
}

function scrollChatToBottom() {
  const chatMessages = document.getElementById('chat-widget-messages');
  if (!chatMessages) return;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
