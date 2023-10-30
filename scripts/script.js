new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Deva shree Ganesha",
          artist: "Ajay-Atul",
          cover: "./img/a.jpg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/a.mp3",
          url: "https://www.youtube.com/watch?v=RYqJ5w-GrfM",
          favorited: true
        },
        {
          name: "Shwasat Raja Dhyasat Raja..",
          artist: "Avadhoot Gandhi",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/s.jpg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/s.mp3",
          url: "https://www.youtube.com/watch?v=7svhUsjZbbY",
          favorited: true
        },
        {
          name: "Heat waves",
          artist: "Glass Animals",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/h.jpg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/h.mp3",
          url: "https://www.youtube.com/watch?v=mRD0-GxqHVo",
          favorited: true
        },
        {
          name: "Rise up",
          artist: "Imagine Dragons",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/i.jpg",
          source:"https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/i.mp3",
          url: "https://www.youtube.com/watch?v=x12CWu3V0lg",
          favorited: true
        },
        {
          name: "Vikram",
          artist: "Anirudh Ravicharan",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/v.jpg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/v.mp3",
          url: "https://www.youtube.com/watch?v=w7shUeR3-Go",
          favorited: true
        },
        {
          name: "Hanuman Rhythm",
          artist: "Bass Rebellion",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/b.jpg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/b.mp3",
          url: "https://www.youtube.com/watch?v=FpkN_V0MYOk",
          favorited: true
        },
        {
          name: "Playing With Fire 🔥",
          artist: "BlackPink",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/4.jpeg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=9pdj4iJD08s&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "Dynamite",
          artist: "BTS",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/7.jpeg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
          favorited: true
        },
        {
          name: "DNA",
          artist: "BTS",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/8.jpeg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Butter",
          artist: "BTS",
          cover: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/img/9.jpeg",
          source: "https://github.com/Vaibhav9T/Mini-Music-Player/blob/main/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
