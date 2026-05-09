import { useRef } from "react"

function DualCamera({ clip, onEnded }) {
  const frontRef = useRef(null)
  const rearRef = useRef(null)

  return (
    <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
      <div>
        <p>Front Camera</p>
        <video
          ref={frontRef}
          src={clip.frontUrl}
          width="400"
          controls
          autoPlay
          onEnded={onEnded}
        />
      </div>
      <div>
        <p>Rear Camera</p>
        <video
          ref={rearRef}
          src={clip.rearUrl}
          width="400"
          controls
          autoPlay
        />
      </div>
    </div>
  )
}

export default DualCamera