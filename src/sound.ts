export class SoundManager
{
  static context = new AudioContext();
  static dest: AudioNode = this.context.destination;
  static sounds = new Map<string, AudioBuffer>();
  static audioAvailable = false;
  
  static async loadSound (url: string, name: string)
  {
    if (this.sounds.has(name)) return;
    
    const buffer: AudioBuffer = await fetch(url)
      .then(res => res.arrayBuffer())
      .then(ArrayBuffer => this.context.decodeAudioData(ArrayBuffer));
    
    this.sounds.set(name, buffer);
  }
  
  static playSound (name: string)
  {
    const sound = this.sounds.get(name);
    
    if (sound && this.audioAvailable) {
      const source = this.context.createBufferSource();
      source.buffer = sound;
      source.connect(this.dest);
      source.start();
    }
  }
}

window.addEventListener("mousedown", () => SoundManager.audioAvailable = true);