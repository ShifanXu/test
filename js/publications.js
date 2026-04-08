(function () {
  const authorDirectory = {
    "Shifan Xu": "https://www.shifanxu.com",
    "Yongshan Ding": "https://www.yongshanding.com/",
    "Steven M. Girvin": "https://girvin.sites.yale.edu/",
    "Shruti Puri": "https://purigroup.research.yale.edu/",
    "Ang Li": "https://www.angliphd.com/",
    "Andrew W. Cross": "https://research.ibm.com/people/andrew-cross",
    "Theodore J. Yoder": "https://scholar.google.com/citations?user=OhiKBrsAAAAJ&hl=en",
    "Ali Javadi-Abhari": "https://scholar.google.com/citations?user=-I6kav0AAAAJ&hl=en",
    "Yufei Ding": "https://sites.google.com/ucsd.edu/yufeiding",
    "Connor T. Hann": "https://www.linkedin.com/in/connor-hann-b1a40132b/",
    "Ben Foxman": "https://www.linkedin.com/in/benfoxman1/",
    "Patrick Rall": "https://patrickrall.com/",
    "Tomas Jochym-O'Connor": "https://tomasjoc.com/",
    "D. K. Weiss": "https://dkweiss.net/",
    "Alvin Lu": "https://www.linkedin.com/in/alvin-lu-7934b72b5/",
    "Kun Liu": "https://www.linkedin.com/in/kun-liu-0276141a4/",
    "Zhiyang He": "https://sunnyzhiyanghe.github.io/",
    "Zeyuan Zhou": "https://www.linkedin.com/in/victorzzhou/",
    "Chenxu Liu": "https://www.pnnl.gov/science/staff/staff_info.asp?staff_num=11658",
    "Charles Guinn": "https://houcklab.princeton.edu/people/charlie-guinn",
    "John M. Martyn": "https://jmmartyn.github.io/",
    "Samuel Stein": "https://www.pnnl.gov/people/sam-stein",
    "Diana Chamaki": "https://berkelbach.chem.columbia.edu/",
    "Ying Mao": "https://yingmao.github.io/",
    "Shuwen Kan": "https://www.linkedin.com/in/shuwen-kan-89510b1a7/",
    "Ethan Decker": "https://linkedin.com/in/ethan-decker-b91bb3202",
    "Meng Wang": "https://www.linkedin.com/in/mengwang-ubc/",
    "Luis F. Zuluaga": "https://engineering.lehigh.edu/faculty/luis-f-zuluaga",
    "Tamás Terlaky": "https://engineering.lehigh.edu/faculty/tamas-terlaky",
    "Adrian Harkness": "https://www.linkedin.com/in/adrian-harkness/",
    "Shraddha Singh": "https://www.linkedin.com/in/shraddha-singh-161566176/"
  };

  const authorAliases = {
    "Shifan XU": "Shifan Xu",
    "Yongshan DING": "Yongshan Ding",
    "Steve Girvin": "Steven M. Girvin",
    "Steven Girvin": "Steven M. Girvin",
    "Theodore J Yoder": "Theodore J. Yoder",
    "Shruti Puri Yale": "Shruti Puri",
    "Andrew Cross": "Andrew W. Cross",
    "Ali Javadi Abhari": "Ali Javadi-Abhari",
    "Yufei DING": "Yufei Ding",
    "Connor Hann": "Connor T. Hann",
    "Ben M. Foxman": "Ben Foxman",
    "Pat Rall": "Patrick Rall",
    "Tomas Jochym O'Connor": "Tomas Jochym-O'Connor",
    "DK Weiss": "D. K. Weiss",
    "Sunny Zhiyang He": "Zhiyang He",
    "Sam Stein": "Samuel Stein",
    "John M Martyn": "John M. Martyn",
    "Charlie Guinn": "Charles Guinn",
    "Ying MAO": "Ying Mao",
    "Diana C. Chamaki": "Diana Chamaki",
    "Tamas Terlaky": "Tamás Terlaky"
  };

  const publications = [
    {
      title: "In-Situ Simultaneous Magic State Injection on Arbitrary CSS qLDPC Codes",
      authors: ["Kun Liu", "Shifan Xu", "Tomas Jochym-O'Connor", "Zhiyang He", "Shraddha Singh", "Yongshan Ding"],
      venue: "arXiv preprint",
      venueFull: "arXiv preprint",
      year: 2026,
      sortDate: "2026-04",
      selected: false,
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2604.05126" }
      ]
    },
    {
      title: "Distilling Magic States in the Bicycle Architecture",
      authors: ["Shifan Xu", "Kun Liu", "Patrick Rall", "Zhiyang He", "Yongshan Ding"],
      venue: "ISCA",
      venueFull: "International Symposium on Computer Architecture (ISCA)",
      year: 2026,
      sortDate: "2026-02",
      selected: true,
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2602.20546" }
      ]
    },
    {
      title: "FTCircuitBench: A Benchmark Suite for Fault-Tolerant Quantum Compilation and Architecture",
      authors: [
        "Adrian Harkness",
        "Shuwen Kan",
        "Chenxu Liu",
        "Meng Wang",
        "John M. Martyn",
        "Shifan Xu",
        "Diana Chamaki",
        "Ethan Decker",
        "Ying Mao",
        "Luis F. Zuluaga",
        "Tamás Terlaky",
        "Ang Li",
        "Samuel Stein"
      ],
      venue: "arXiv preprint",
      venueFull: "arXiv preprint",
      year: 2026,
      sortDate: "2026-01",
      selected: false,
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2601.03185" }
      ]
    },
    {
      title: "Fat-Tree QRAM: A High-Bandwidth Shared Quantum Random Access Memory for Parallel Queries",
      authors: ["Shifan Xu", "Alvin Lu", "Yongshan Ding"],
      venue: "ASPLOS",
      venueFull: "Architectural Support for Programming Languages and Operating Systems (ASPLOS)",
      year: 2025,
      sortDate: "2025-02",
      selected: true,
      links: [
        { label: "DOI", url: "https://doi.org/10.1145/3676641.3716256" },
        { label: "arXiv", url: "https://arxiv.org/abs/2502.06767" }
      ]
    },
    {
      title: "HetEC: Architectures for Heterogeneous Quantum Error Correction Codes",
      authors: [
        "Samuel Stein",
        "Shifan Xu",
        "Andrew W. Cross",
        "Theodore J. Yoder",
        "Ali Javadi-Abhari",
        "Chenxu Liu",
        "Kun Liu",
        "Zeyuan Zhou",
        "Charles Guinn",
        "Yufei Ding",
        "Yongshan Ding",
        "Ang Li"
      ],
      venue: "ASPLOS",
      venueFull: "Architectural Support for Programming Languages and Operating Systems (ASPLOS)",
      year: 2025,
      sortDate: "2024-11",
      selected: false,
      links: [
        { label: "DOI", url: "https://doi.org/10.1145/3676641.3716001" },
        { label: "arXiv", url: "https://arxiv.org/abs/2411.03202" }
      ]
    },
    {
      title: "Faulty towers: recovering a functioning quantum random access memory in the presence of defective routers",
      authors: ["D. K. Weiss", "Shifan Xu", "Shruti Puri", "Yongshan Ding", "Steven M. Girvin"],
      venue: "arXiv preprint",
      venueFull: "arXiv preprint",
      year: 2024,
      sortDate: "2024-11",
      selected: false,
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2411.15612" }
      ]
    },
    {
      title: "Systems Architecture for Quantum Random Access Memory",
      authors: ["Shifan Xu", "Connor T. Hann", "Ben Foxman", "Steven M. Girvin", "Yongshan Ding"],
      venue: "MICRO",
      venueFull: "IEEE/ACM International Symposium on Microarchitecture (MICRO)",
      year: 2023,
      sortDate: "2023-08",
      selected: true,
      links: [
        { label: "DOI", url: "https://doi.org/10.1145/3613424.3614270" },
        { label: "arXiv", url: "https://arxiv.org/abs/2306.03242" }
      ]
    }
  ];

  window.authorAliases = authorAliases;
  window.authorDirectory = authorDirectory;
  window.publications = publications;
})();
