import { HomePage, LoginPage, RegisterPage, ArticleEditPage } from "../util/constants"

export const createHeader = ({ navigator }) => ({
  view: model => {
    const active = pageId => ({ className: { "active": model.pageId === pageId } })

    return ["nav.navbar.navbar-light",
      [".container",
        ["a.navbar-brand", { href: navigator.getUrl(HomePage) }, "conduit"],
        ["ul.nav.navbar-nav.pull-xs-right",
          ["li.nav-item", active(HomePage),
            ["a.nav-link", { href: navigator.getUrl(HomePage) }, "Home"]
          ],
          model.signedIn ? [
            ["li.nav-item", active("articleEdit"),
              ["a.nav-link", { href: navigator.getUrl(ArticleEditPage) },
                ["i.ion-compose"],
                ["span", { innerHTML: "&nbsp;New Post" }]
              ]
            ],
            ["li.nav-item", active("settings"),
              ["a.nav-link", { href: "/settings" },
                ["i.ion-gear-a"],
                ["span", { innerHTML: "&nbsp;Settings" }]
              ]
            ],
            ["li.nav-item", active("username"),
              ["a.nav-link", { href: "/@" + model.user.username }, model.user.username]
            ]
          ] : [
            ["li.nav-item", active(LoginPage),
              ["a.nav-link", { href: navigator.getUrl(LoginPage) }, "Sign in"]
            ],
            ["li.nav-item", active(RegisterPage),
              ["a.nav-link", { href: navigator.getUrl(RegisterPage) }, "Sign up"]
            ]
          ]
        ]
      ]
    ]
  }
})

export const createFooter = ({ navigator }) => ({
  view: _model =>
    ["footer",
      [".container",
        ["a.logo-font", { href: navigator.getUrl(HomePage) }, "conduit"],
        ["span.attribution",
          "An interactive learning project from ",
          ["a[href=https://thinkster.io]", "Thinkster"],
          ["span", { innerHTML: ". Code &amp; design licensed under MIT." }]
        ]
      ]
    ]
})