import { defineStore } from "pinia";

export const useCellsStore = defineStore("cells", {
  state: () => ({
    desktopCells: [
      { text: "سامانه جامع مالی", category: "mali", image: "/src/assets/mali.png", top: "40vh", left: "22vw", color: "#C49227" },
      { text: "سامانه جامع عمران", category: "omran", image: "/src/assets/omran.png", top: "70vh", left: "12vw", color: "#F2CF11" },
      { text: "سامانه جامع سلامت", category: "salamat", image: "/src/assets/salamat.png", top: "40vh", left: "12vw", color: "#01CBE1" },
      { text: "سامانه جامع صنایع", category: "sanaye", image: "/src/assets/sanaye.png", top: "70vh", left: "22vw", color: "#05B0C4" },
      { text: "سامانه جامع معادن", category: "maaden", image: "/src/assets/maaden.png", top: "40vh", left: "32vw", color: "#ED7D1E" },
      { text: "سامانه جامع تجارت", category: "tejarat", image: "/src/assets/tejarat.png", top: "70vh", left: "32vw", color: "#BD373B" },
      { text: "سامانه جامع کشاورزی", category: "keshavarzi", image: "/src/assets/keshavarzi.png", top: "40vh", left: "65vw", color: "#4DA433" },
      { text: "سامانه جامع حمل و نقل", category: "hamlonaghl", image: "/src/assets/hamlnaghl.png", top: "70vh", left: "65vw", color: "#B6B4AE" },
      { text: "سامانه جامع گردشگری", category: "gardeshgari", image: "/src/assets/gardeshgari.png", top: "40vh", left: "75vw", color: "#B9ADC9" },
      { text: "سامانه جامع فناوری", category: "fanavari", image: "/src/assets/fanavari.png", top: "70vh", left: "75vw", color: "#608460" },
      { text: "سامانه جامع اصناف", category: "asnaf", image: "/src/assets/asnaf.png", top: "40vh", left: "85vw", color: "#AE8EBB" },
      { text: "سامانه جامع آموزش", category: "amozesh", image: "/src/assets/amozesh.png", top: "70vh", left: "85vw", color: "#E3E1DD" },
    ],
    mobileCells: [
      { text: "مالی", category: "mali", image: "/src/assets/mali.png", top: "10vh", left: "18vw", color: "#C49227" },
      { text: "عمران", category: "omran", image: "/src/assets/omran.png", top: "10vh", left: "46vw", color: "#F2CF11" },
      { text: "سلامت", category: "salamat", image: "/src/assets/salamat.png", top: "10vh", left: "74vw", color: "#01CBE1" },
      { text: "صنایع", category: "sanaye", image: "/src/assets/sanaye.png", top: "27vh", left: "18vw", color: "#05B0C4" },
      { text: "معادن", category: "maaden", image: "/src/assets/maaden.png", top: "27vh", left: "46vw", color: "#ED7D1E" },
      { text: "تجارت", category: "tejarat", image: "/src/assets/tejarat.png", top: "27vh", left: "74vw", color: "#BD373B" },
      { text: "کشاورزی", category: "keshavarzi", image: "/src/assets/keshavarzi.png", top: "44vh", left: "18vw", color: "#4DA433" },
      { text: "حمل و نقل", category: "hamlonaghl", image: "/src/assets/hamlnaghl.png", top: "44vh", left: "46vw", color: "#B6B4AE" },
      { text: "گردشگری", category: "gardeshgari", image: "/src/assets/gardeshgari.png", top: "44vh", left: "74vw", color: "#B9ADC9" },
      { text: "فناوری", category: "fanavari", image: "/src/assets/fanavari.png", top: "61vh", left: "18vw", color: "#608460" },
      { text: "اصناف", category: "asnaf", image: "/src/assets/asnaf.png", top: "61vh", left: "46vw", color: "#AE8EBB" },
      { text: "آموزش", category: "amozesh", image: "/src/assets/amozesh.png", top: "61vh", left: "74vw", color: "#E3E1DD" },
    ],
  }),

  getters: {
    getCells: (state) => (isMobile) =>
      isMobile ? state.mobileCells : state.desktopCells,
  },
});
