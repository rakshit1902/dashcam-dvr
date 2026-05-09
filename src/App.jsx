import { useState } from "react"
import clips from "./data/clips"
import Timeline from "./components/Timeline"
import DualCamera from "./components/DualCamera"

function App() {
  const [currentClip, setCurrentClip] = useState(clips[0])

  function handleClipSelect(clip) {
    setCurrentClip(clip)
  }

  function handleEnded() {
    const currentIndex = clips.findIndex((c) => c.id === currentClip.id)
    const nextClip = clips[currentIndex + 1]
    if (nextClip) {
      setCurrentClip(nextClip)
    }
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>DVR History Playback</h1>
      <Timeline
        clips={clips}
        currentClip={currentClip}
        onClipSelect={handleClipSelect}
      />
      <DualCamera clip={currentClip} onEnded={handleEnded} />
    </div>
  )
}

export default App