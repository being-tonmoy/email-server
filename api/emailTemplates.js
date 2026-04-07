/**
 * Email Templates Component
 * Centralized email template definitions for application form submissions
 */

/**
 * Template for application form submission confirmation
 */
const applicationFormSubmissionTemplate = (formData) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="background-color: #001f3f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
        <h2 style="margin: 0;">Institutional Email Application Form Submission</h2>
      </div>
      
      <!-- Main Content -->
      <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px;">
        <!-- Greeting Section -->
        <div style="margin-bottom: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #001f3f;">
          <p style="margin: 0; font-size: 16px; color: #333;">
            Dear <strong>${formData.firstName || 'Student'} ${formData.lastName || ''}</strong>,
          </p>
          <p style="margin: 10px 0 0 0; color: #555;">
            Your Email Application Form has been received. Thank you for submitting your application!
          </p>
        </div>

        <!-- Personal Information Section -->
        <h3 style="color: #001f3f; border-bottom: 2px solid #001f3f; padding-bottom: 10px; margin-top: 20px;">Personal Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 40%;">First Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.firstName || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Last Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.lastName || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Student ID:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.studentId || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Primary Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData.studentId}" style="color: #001f3f; text-decoration: none;"> ${formData.studentId + '@std.cu.ac.bd' || 'N/A'}</a></td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Alias Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData.aliasEmail}" style="color: #001f3f; text-decoration: none;">${formData.aliasEmail + '@std.cu.ac.bd' || 'N/A'}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Personal Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData.email}" style="color: #001f3f; text-decoration: none;">${formData.email || 'N/A'}</a></td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone Number:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.phoneNumber || 'N/A'}</td>
          </tr>
        </table>

        <!-- Academic Information Section -->
        <h3 style="color: #001f3f; border-bottom: 2px solid #001f3f; padding-bottom: 10px;">Academic Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 40%;">Session:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.session || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Faculty:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.faculty || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Department:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.department || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Degree Level:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.degreeLevel || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Year/Semester Type:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.yearSemesterType || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Year/Semester Value:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formData.yearSemesterValue || 'N/A'}</td>
          </tr>
        </table>

        <!-- Important Note Section -->
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; color: #856404; font-size: 14px;">
            <strong>Important Note:</strong> You do not have to do anything with this email such as printing or submitting physically. Your application has been recorded in our system.
          </p>
        </div>

        <!-- Submission Details -->
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            <strong>Submission Time:</strong> ${new Date().toLocaleString()}<br/>
            <strong>Note:</strong> This is an automatically generated confirmation email. Please do not reply to this email.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #001f3f; color: white; padding: 20px; text-align: center; border-radius: 0 0 5px 5px; margin-top: 0;">
        <p style="margin: 0; font-size: 14px;">
          Powered by <strong>ICT Cell, University of Chittagong</strong>
        </p>
      </div>
    </div>
  `;
};

module.exports = {
  applicationFormSubmissionTemplate
};
