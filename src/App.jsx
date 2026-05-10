import { useState, useEffect, useRef } from "react"
import Timeline from "./components/Timeline"
import DualCamera from "./components/DualCamera"

function App() {
  const [clips, setClips] = useState([])
  const [currentClip, setCurrentClip] = useState(null)
  const [durations, setDurations] = useState({})
  const [viewMode, setViewMode] = useState("dual")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:4000/api/clips")
      .then((res) => res.json())
      .then((data) => {
        setClips(data)
        setCurrentClip(data[0])
        setLoading(false)
        // Auto-detect duration of each clip
        data.forEach((clip) => {
          const vid = document.createElement("video")
          vid.src = clip.frontUrl
          vid.preload = "metadata"
          vid.onloadedmetadata = () => {
            setDurations((prev) => ({ ...prev, [clip._id]: Math.round(vid.duration) }))
          }
        })
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#555", fontSize: "0.85rem", letterSpacing: "2px" }}>LOADING...</p>
    </div>
  )

  if (!currentClip) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#555" }}>No clips found.</p>
    </div>
  )

  const currentIndex = clips.findIndex((c) => c._id === currentClip._id)

  function handleClipSelect(clip) { setCurrentClip(clip) }
  function handleEnded() {
    const nextClip = clips[currentIndex + 1]
    if (nextClip) setCurrentClip(nextClip)
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111" }}>

      <div style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #2a2a2a", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", fontSize: "0.95rem", color: "#fff", letterSpacing: "-0.3px" }}>Dashcam Playback</span>

        <div style={{ display: "flex", backgroundColor: "#222", border: "1px solid #333", borderRadius: "6px", overflow: "hidden" }}>
          <button onClick={() => setViewMode("single")} style={{ padding: "6px 20px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontFamily: "Inter, sans-serif", backgroundColor: viewMode === "single" ? "#fff" : "transparent", color: viewMode === "single" ? "#111" : "#666", fontWeight: viewMode === "single" ? "600" : "400", transition: "all 0.15s" }}>Single</button>
          <button onClick={() => setViewMode("dual")} style={{ padding: "6px 20px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontFamily: "Inter, sans-serif", backgroundColor: viewMode === "dual" ? "#fff" : "transparent", color: viewMode === "dual" ? "#111" : "#666", fontWeight: viewMode === "dual" ? "600" : "400", transition: "all 0.15s" }}>Dual</button>
        </div>
      </div>

      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "32px 24px" }}>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#fff", letterSpacing: "-0.5px" }}>History Playback</h1>
          <p style={{ color: "#555", fontSize: "0.82rem", marginTop: "5px" }}>
            {currentClip.date} &nbsp;·&nbsp; Clip {currentIndex + 1} of {clips.length}
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[
            { label: "Clip", value: `Clip ${currentIndex + 1} of ${clips.length}` },
            { label: "Date", value: currentClip.date },
            { label: "Duration", value: durations[currentClip._id] ? `${durations[currentClip._id]}s` : "detecting..." },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "10px 16px", minWidth: "120px" }}>
              <p style={{ color: "#555", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "3px" }}>{label}</p>
              <p style={{ color: "#ddd", fontSize: "0.88rem", fontWeight: "500" }}>{value}</p>
            </div>
          ))}
        </div>

        <Timeline clips={clips} currentClip={currentClip} onClipSelect={handleClipSelect} durations={durations} />
        <DualCamera clip={currentClip} onEnded={handleEnded} viewMode={viewMode} />

      </div>
    </div>
  )
}

export default App