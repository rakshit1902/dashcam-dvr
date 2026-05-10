function DualCamera({ clip, onEnded, viewMode }) {
  return (
    <div style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "18px 20px" }}>
      <p style={{ marginBottom: "14px", color: "#444", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1.5px" }}>
        Camera Feeds — {clip.label}
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: viewMode === "dual" ? "1fr 1fr" : "1fr",
        gap: "14px",
        maxWidth: viewMode === "single" ? "50%" : "100%",
        margin: "0 auto"
      }}>

        <div>
          <p style={{ marginBottom: "7px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#444" }}>
            Front
          </p>
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
            <video
              key={clip._id + "front"}
              src={clip.frontUrl}
              controls
              autoPlay
              muted
              onEnded={onEnded}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "6px", backgroundColor: "#000", border: "1px solid #2a2a2a", objectFit: "cover" }}
            />
          </div>
        </div>

        {viewMode === "dual" && (
          <div>
            <p style={{ marginBottom: "7px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#444" }}>
              Rear
            </p>
            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
              <video
                key={clip._id + "rear"}
                src={clip.rearUrl}
                controls
                autoPlay
                muted
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "6px", backgroundColor: "#000", border: "1px solid #2a2a2a", objectFit: "cover" }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DualCamera