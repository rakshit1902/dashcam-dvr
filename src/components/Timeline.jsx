function Timeline({ clips, currentClip, onClipSelect }) {
  return (
    <div>
      <h3>Timeline</h3>
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        {clips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => onClipSelect(clip)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: currentClip.id === clip.id ? "blue" : "gray",
              color: "white",
              border: "none",
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