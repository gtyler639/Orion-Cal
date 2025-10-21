import { useState } from 'react'
import { Link } from 'react-router-dom'

function Resume() {
  const [inputMethod, setInputMethod] = useState('text')
  const [resumeText, setResumeText] = useState('')
  const [rewrittenResume, setRewrittenResume] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleMethodChange = (method) => {
    setInputMethod(method)
  }

  const handleRewrite = async () => {
    if (!resumeText.trim()) {
      alert('Please enter your resume text first.')
      return
    }

    setIsLoading(true)

    try {
      // This would call your API
      // For now, we'll use a placeholder
      setTimeout(() => {
        setRewrittenResume(`✨ OPTIMIZED RESUME ✨\n\n${resumeText}\n\n[AI-powered improvements applied]`)
        setIsLoading(false)
      }, 2000)

    } catch (error) {
      console.error('Error rewriting resume:', error)
      alert('Error rewriting resume. Please try again.')
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setResumeText(e.target.result)
        setInputMethod('text')
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Transform your resume with AI-powered professional optimization.</h1>
        <p></p>
        <Link to="/" className="btn-secondary" style={{ marginTop: '15px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
      </div>

      <div className="main-content">
        <div className="input-section">
          <h2 className="section-title">Enter Your Resume Here</h2>

          <div className="input-methods">
            <button
              className={`method-btn ${inputMethod === 'text' ? 'active' : ''}`}
              onClick={() => handleMethodChange('text')}
            >
              ✏️ Paste Text
            </button>
            <button
              className={`method-btn ${inputMethod === 'file' ? 'active' : ''}`}
              onClick={() => handleMethodChange('file')}
            >
              📁 Upload File
            </button>
          </div>

          {inputMethod === 'text' ? (
            <div id="text-method">
              <textarea
                className="text-input"
                placeholder="Paste your resume text here...

Example:
John Smith
Email: john@email.com
Phone: (555) 123-4567

EXPERIENCE
Sales Associate at ABC Store (2022-2024)
- Helped customers
- Sold products
- Worked with team

EDUCATION
Bachelor's Degree in Business
State University (2018-2022)

SKILLS
- Communication
- Sales
- Customer service"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>
          ) : (
            <div id="file-method" className="file-upload-container">
              <div
                className="file-upload"
                onClick={() => document.getElementById('file-input').click()}
              >
                <div className="upload-icon">📄</div>
                <h3>Drop your resume here or click to browse</h3>
                <p>Supports PDF, Word, and text files</p>
                <input
                  type="file"
                  id="file-input"
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}

          <button
            className="rewrite-btn"
            onClick={handleRewrite}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                <span className="btn-text">Rewriting Resume...</span>
              </>
            ) : (
              <span className="btn-text">✨ Rewrite My Resume</span>
            )}
          </button>
        </div>

        <div className="output-section">
          <h2 className="section-title">Optimized Resume</h2>
          <textarea
            className="output-area"
            placeholder="Your professionally rewritten resume will appear here..."
            value={rewrittenResume}
            readOnly
          />
          <button
            className="download-btn"
            onClick={() => {
              if (rewrittenResume) {
                const blob = new Blob([rewrittenResume], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `optimized_resume_${new Date().toISOString().slice(0, 10)}.txt`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
              }
            }}
            disabled={!rewrittenResume}
          >
            💾 Download Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default Resume
