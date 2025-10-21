import { useState } from 'react'
import { Link } from 'react-router-dom'

function Jobfit() {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [jobRequirements, setJobRequirements] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0])
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jobTitle || !jobDescription) {
      alert('Please upload your resume and fill in job title and description')
      return
    }

    setIsAnalyzing(true)

    try {
      // This would call your API
      // For now, we'll use a placeholder
      setTimeout(() => {
        setResults({
          jobFitScore: 85,
          summary: 'Strong match! Your background aligns well with the job requirements.',
          strengths: [
            'Relevant experience found',
            'Skills demonstrate competency',
            'Background supports role'
          ],
          gaps: [
            'Consider highlighting achievements',
            'Add quantifiable metrics'
          ],
          recommendations: [
            'Customize resume for role',
            'Prepare specific examples',
            'Research company culture'
          ]
        })
        setIsAnalyzing(false)
      }, 2000)

    } catch (error) {
      console.error('Error analyzing job fit:', error)
      alert('Error analyzing job fit. Please try again.')
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Save the hassle and find out if that job is right for you.</h1>
        <a href="#scroll">Try it Out</a>
      </div>

      <div className="main-content">
        <div className="input-column">
          <div className="form-section" id="scroll">
            <h2>Upload Your Resume Here</h2>
            <div className="form-group">
              <label htmlFor="resume">Upload Resume (PDF, DOC, DOCX, or TXT)</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="resume"
                  className="file-input"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
                <label htmlFor="resume" className="file-input-label">
                  {resumeFile ? `📄 ${resumeFile.name}` : '📄 Choose resume file or drag and drop'}
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Insert the Job Details</h2>
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea
                id="jobDescription"
                placeholder="Paste the complete job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobRequirements">Additional Requirements (Optional)</label>
              <textarea
                id="jobRequirements"
                placeholder="Any specific requirements, qualifications, or skills not mentioned in the job description..."
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
              />
            </div>
          </div>

          <button className="analyze-btn" onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing Job Fit...' : '🧠 Analyze Job Fit with AI'}
          </button>
        </div>

        <div className="output-column">
          {results && (
            <div className="results">
              <h2>Analysis Results</h2>
              <div className="job-fit-score">
                <div className="score-circle">
                  <div className="score-text">{results.jobFitScore}%</div>
                </div>
                <div className="score-label">Job Fit Score</div>
              </div>

              <div className="analysis-content">
                <div className="analysis-section">
                  <h3>🎯 Overall Assessment</h3>
                  <p>{results.summary}</p>
                </div>

                <div className="analysis-section">
                  <h3>✅ Strengths & Matches</h3>
                  <ul>
                    {results.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="analysis-section">
                  <h3>⚠️ Gaps & Areas for Improvement</h3>
                  <ul>
                    {results.gaps.map((gap, index) => (
                      <li key={index}>{gap}</li>
                    ))}
                  </ul>
                </div>

                <div className="analysis-section">
                  <h3>💡 Recommendations</h3>
                  <ul>
                    {results.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobfit
