// StatusBar.js - Default component for the application status bar

import BaseComponent from '../utils/BaseComponent.js';

class StatusBar extends BaseComponent {
  constructor(containerId) {
    // Initialize the base component with component name
    super('StatusBar');
    
    this.container = document.getElementById(containerId);
    this.status = 'Ready';
  }

  render() {
    // Clear the container
    this.container.innerHTML = '';
    
    // Create status text element
    const statusText = document.createElement('div');
    statusText.className = 'status-text';
    statusText.textContent = this.status;
    
    // Append to container
    this.container.appendChild(statusText);
  }
  
  setStatus(text) {
    this.status = text;
    const statusText = this.container.querySelector('.status-text');
    if (statusText) {
      statusText.textContent = text;
    }
  }
  
  getStatus() {
    return this.status;
  }
  
  showTemporaryStatus(text, duration = 3000) {
    const previousStatus = this.status;
    this.setStatus(text);
    
    setTimeout(() => {
      this.setStatus(previousStatus);
    }, duration);
  }
  
  // Override the handleMessage method from BaseComponent
  handleMessage(messageType, messageData, sender) {
    console.log(`StatusBar received message: ${messageType}`, messageData);
    
    switch (messageType) {
      case 'UPDATE_STATUS':
        if (messageData.data && messageData.data.text) {
          this.setStatus(messageData.data.text);
          return true;
        }
        break;
        
      case 'SHOW_TEMPORARY_STATUS':
        if (messageData.data && messageData.data.text) {
          const duration = messageData.data.duration || 3000;
          this.showTemporaryStatus(messageData.data.text, duration);
          return true;
        }
        break;
    }
    
    return false; // Message not handled
  }
}

export default StatusBar;
