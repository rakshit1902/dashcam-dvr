function Timeline({ clips, currentClip, onClipSelect }) {
  return (
    <div style={{ marginBottom: "16px", backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "18px 20px" }}>
      <p style={{ marginBottom: "12px", color: "#444", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1.5px" }}>
        Timeline
      </p>

      {/* Bar */}
      <div style={{ display: "flex", height: "3px", borderRadius: "4px", overflow: "hidden", backgroundColor: "#2a2a2a", marginBottom: "14px" }}>
        {clips.map((clip) => (
          <div
            key={clip._id}
            onClick={() => onClipSelect(clip)}
            style={{
              flex: 1,
              backgroundColor: currentClip._id === clip._id ? "#fff" : "#333",
              cursor: "pointer",
              marginRight: "2px",
              transition: "background-color 0.2s",
            }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
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
            {clip.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Timeline