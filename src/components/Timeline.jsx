function Timeline({ clips, currentClip, onClipSelect, durations }) {
  if (!clips.length) return null

  const totalDuration = clips.reduce((sum, clip) => sum + (durations[clip._id] || 0), 0)

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return m > 0 ? `${m}m ${s}s` : `${s}s`
  }

  let elapsed = 0

  return (
    <div style={{ marginBottom: "16px", backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "18px 20px" }}>
      <p style={{ marginBottom: "16px", color: "#444", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1.5px" }}>
        Timeline — {totalDuration > 0 ? formatTime(totalDuration) : "detecting..."}
      </p>

      {/* Bar */}
      <div style={{ position: "relative", height: "36px", backgroundColor: "#222", borderRadius: "6px", marginBottom: "8px" }}>
        {clips.map((clip) => {
          const dur = durations[clip._id] || 0
          const left = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0
          const width = totalDuration > 0 ? (dur / totalDuration) * 100 : 100 / clips.length
          elapsed += dur
          const isActive = currentClip._id === clip._id

          return (
            <div
              key={clip._id}
              onClick={() => onClipSelect(clip)}
              title={`${clip.label} — ${dur}s`}
              style={{
                position: "absolute",
                left: `${left}%`,
                width: `calc(${width}% - 2px)`,
                top: "4px",
                height: "28px",
                backgroundColor: isActive ? "#fff" : "#3a3a3a",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.15s",
                display: "flex",
                alignItems: "center",
                paddingLeft: "6px",
                overflow: "hidden",
              }}
            >
              <span style={{ fontSize: "0.65rem", color: isActive ? "#111" : "#666", whiteSpace: "nowrap", fontFamily: "Inter, sans-serif" }}>
                {dur > 0 ? `${dur}s` : ""}
              </span>
            </div>
          )
        })}
      </div>

      {/* Clip buttons */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "14px" }}>
        {clips.map((clip) => (
          <button
            key={clip._id}
            onClick={() => onClipSelect(clip)}
            style={{
              padding: "6px 14px",
              cursor: "pointer",
              backgroundColor: currentClip._id === clip._id ? "#fff" : "transparent",
              color: currentClip._id === clip._id ? "#111" : "#555",
              border: "1px solid",
              borderColor: currentClip._id === clip._id ? "#fff" : "#2a2a2a",
              borderRadius: "5px",
              fontSize: "0.78rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: currentClip._id === clip._id ? "600" : "400",
              transition: "all 0.15s",
            }}
          >
            Clip {clips.findIndex(c => c._id === clip._id) + 1} &nbsp;·&nbsp; {durations[clip._id] ? `${durations[clip._id]}s` : "..."}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Timeline