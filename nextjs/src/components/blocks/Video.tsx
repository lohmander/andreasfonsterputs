export interface VideoProps {
  video?: string;
  auto_play?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function Video(props: VideoProps) {
  return (
    <section>
      <video
        muted
        playsInline
        controls={props.controls}
        autoPlay={props.auto_play}
        loop={props.loop}
      >
        <source src={props.video} type="video/mp4" />
      </video>
      <style jsx>{`
        video {
          vertical-align: top;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
