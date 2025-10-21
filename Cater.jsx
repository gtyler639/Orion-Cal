import { useState } from 'react'
import { Link } from 'react-router-dom'

function Cater() {
  const [resumeText, setResumeText] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tailoredResume, setTailoredResume] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!resumeText || (!jobDescription && !jobUrl)) {
      alert('Please enter your resume and either a job description or URL')
      return
    }

    setIsLoading(true)

    try {
      // This would call your API
      // For now, we'll use a placeholder
      setTimeout(() => {
        setTailoredResume(`✨ TAILORED RESUME ✨\n\n${resumeText}\n\n[Tailored for job requirements]`)
        setIsLoading(false)
      }, 2000)

    } catch (error) {
      console.error('Error tailoring resume:', error)
      alert('Error tailoring resume. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>AI Resume Rewriter</h1>
        <p>Transform your resume to perfectly match any job description using AI</p>
      </div>

      <div className="main-content">
        <div className="input-section">
          <div className="section-header">
            <div className="section-icon">📝</div>
            <h2 className="section-title">Input</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="currentResume">Current Resume</label>
              <textarea
                id="currentResume"
                className="text-input"
                placeholder="Paste your current resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows="10"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="jobUrl">Job URL (Optional)</label>
              <input
                type="url"
                id="jobUrl"
                className="text-input"
                placeholder="Paste job URL from LinkedIn, Indeed, or any job site..."
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
              <small style={{ color: '#667', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                💡 Try pasting a job URL - we'll attempt to extract the description
              </small>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="jobDescription">Job Description</label>
              <textarea
                id="jobDescription"
                className="text-input"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows="8"
              />
              <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                💡 If URL extraction doesn't work, copy-paste the job description manually
              </small>
            </div>

            <button type="submit" className="rewrite-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Rewriting Resume...
                </>
              ) : (
                'Rewrite Resume'
              )}
            </button>
          </form>
        </div>

        <div className="output-section">
          <div className="section-header">
            <div className="section-icon">✨</div>
            <h2 className="section-title">Tailored Resume</h2>
          </div>

          <div className="output-area">
            {tailoredResume || 'Your AI-tailored resume will appear here...'}
          </div>

          <button
            className="download-btn"
            onClick={() => {
              if (tailoredResume) {
                const blob = new Blob([tailoredResume], { type: 'text/plain' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'tailored-resume.txt'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
              }
            }}
            disabled={!tailoredResume}
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cater
