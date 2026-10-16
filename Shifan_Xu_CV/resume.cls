% Adapted from Trey Hunner's resume class and the Simplified Medium Length CV.
% https://github.com/treyhunner/resume/blob/master/resume.cls
% https://www.overleaf.com/latex/templates/simplified-medium-length-professioal-cv-template/pczvfqqzmnvf
%
% Copyright (C) 2010 by Trey Hunner
% Copying and distribution of this file, with or without modification,
% are permitted in any medium without royalty provided the copyright
% notice and this notice are preserved. This file is offered as-is,
% without any warranty.
%
% Local adaptation: multipage academic content, existing section commands,
% explicit link underlines, and page-break-aware entries.
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2026/10/16 Simple academic CV]
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax
\LoadClass[11pt,letterpaper]{article}

\RequirePackage{geometry}
\RequirePackage{fontspec}
\setmainfont{lmroman10-regular.otf}[
  BoldFont=lmroman10-bold.otf,
  ItalicFont=lmroman10-italic.otf,
  BoldItalicFont=lmroman10-bolditalic.otf]
\RequirePackage{array}
\RequirePackage{tabularx}
\RequirePackage{enumitem}
\RequirePackage{needspace}
\RequirePackage{etoolbox}
\RequirePackage{fancyhdr}
\RequirePackage[normalem]{ulem}
\RequirePackage[unicode,hidelinks]{hyperref}
\urlstyle{same}

\setlength{\parindent}{0pt}
\setlength{\parskip}{4pt}
\setlength{\tabcolsep}{0pt}
\setlength{\emergencystretch}{2em}
\clubpenalty=10000
\widowpenalty=10000
\raggedbottom

% The visible underline belongs to the text, never to a PDF annotation border.
\let\plainhref\href
\renewcommand{\href}[2]{\plainhref{#1}{\uline{#2}}}
\renewcommand{\ULthickness}{0.4pt}
\setlength{\ULdepth}{1.8pt}

\newcommand{\name}[1]{\def\@name{#1}}
\def\@name{}
\def\@addresses{}
\newcommand{\address}[1]{\g@addto@macro\@addresses{\printaddress{#1}}}
\newcommand{\addressSep}{\enspace\textbar\enspace}
\newcommand{\printaddress}[1]{%
  \begingroup\centering
  \let\\\addressSep
  #1\par
  \endgroup
}
\AtBeginDocument{%
  \setlength{\headwidth}{\textwidth}%
  \begingroup\centering
  {\fontsize{24pt}{28pt}\selectfont\bfseries\MakeUppercase{\@name}\par}
  \vspace{3pt}
  \@addresses
  \endgroup
  \vspace{3pt}
}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\newcommand{\makecvfooter}[3]{%
  \fancyfoot[L]{\footnotesize #1}%
  \fancyfoot[C]{\footnotesize #2}%
  \fancyfoot[R]{\footnotesize #3}%
}

\newcommand{\cvsection}[1]{%
  \par\Needspace{5\baselineskip}\addvspace{10pt}%
  {\bfseries\MakeUppercase{#1}\par}\nobreak
  \vspace{3pt}\hrule height 0.4pt\relax
  \nobreak\vspace{5pt}\@afterheading
}
\newcommand{\cvsubsection}[1]{%
  \par\Needspace{4\baselineskip}\addvspace{6pt}%
  {\bfseries #1\par}\nobreak\@afterheading
}

\newenvironment{cventries}{\par}{\par}
\newcommand{\cventry}[5]{%
  \par\Needspace{4\baselineskip}\addvspace{5pt}%
  \begingroup
  \renewcommand{\arraystretch}{1.04}%
  \begin{tabularx}{\linewidth}{@{}X@{\hspace{10pt}}r@{}}
    \textbf{#2} & #3 \\
    \textit{#1} & \textit{#4}
  \end{tabularx}\par\nobreak
  \ifstrempty{#5}{}{#5\par}%
  \endgroup
}
\newenvironment{cvitems}{%
  \begin{itemize}[leftmargin=1.4em,label=\textbullet,topsep=2pt,
    itemsep=0pt,parsep=0pt,partopsep=0pt]
}{\end{itemize}}

\newenvironment{cvpubs}{\par}{\par}
\newcommand{\cvpub}[1]{%
  \par\begingroup\interlinepenalty=10000
  \hangindent=1.4em\hangafter=1\noindent #1\par\endgroup
}
\newenvironment{cvparagraph}{\par}{\par}
\newenvironment{cvhonors}{\par}{\par}
\newcommand{\cvhonor}[4]{%
  \par\begingroup\interlinepenalty=10000
  \hangindent=3.5em\hangafter=1
  \makebox[3.5em][l]{#4}\textbf{#1}, #2%
  \ifstrempty{#3}{}{, #3}\par\endgroup
}
