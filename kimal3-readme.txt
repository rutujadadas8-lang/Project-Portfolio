# kimal3

**Trag deine KI-Projekte dort ein, wo sie entstehen: im Terminal.**

Wer mit Claude Code arbeitet, baut echte Dinge — und dokumentiert sie hinterher nicht,
weil das ein zweiter Arbeitsschritt in einem anderen Fenster wäre. `kimal3` schließt
diese Lücke: Am Ende einer Sitzung trägt Claude das fertige Projekt selbst in dein
KImal3-Erfolgsprofil ein. Du gibst es dort nur noch frei.

> **Voraussetzung: ein KImal3-Konto mit Pro.**
> Ohne Pro meldet sich dieses Werkzeug ab, ohne etwas zu tun.
> Was Pro enthält und wie du es bekommst: **https://app.kimal3.de/pro**

## Loslegen

Einmal pro Rechner:

```bash
npm install -g kimal3   # das Werkzeug installieren (setzt Node.js voraus)
kimal3 login            # diesen Rechner mit deinem Konto verbinden
kimal3 skill install    # Claude beibringen, das Werkzeug zu benutzen
```

> **In Claude Code?** Dann lass es einrichten, statt es zu tippen — der Satz zum Kopieren steht
> auf **https://app.kimal3.de/pro**. Nur `kimal3 login` tippst du selbst (dort mit `!`
> davor), weil die Bestätigung im Browser einen Menschen braucht.

`login` zeigt dir eine Adresse und einen achtstelligen Code. Die Adresse rufst du selbst
auf und bestätigst den Code dort in deinem eingeloggten Konto — so wie bei `gh auth login`.
**Es wird kein Passwort ins Terminal getippt.**

## Befehle

```
kimal3                    Zeigt, ob dieser Rechner angemeldet ist
kimal3 login              Diesen Rechner mit deinem Konto verbinden
kimal3 skill install      Claude beibringen, dieses Werkzeug zu benutzen — und dir die /k3-Befehle geben
kimal3 arbeitsplatz neu   Den ganzen KI-Arbeitsplatz anlegen — Firmenebene und Werkbank
kimal3 werkbank neu       Nur eine eigene Werkbank in einer bestehenden Firma anlegen
kimal3 kontext runter     Den Firmenkontext holen — CLAUDE.md und die fünf Dateien in kontext/
kimal3 kontext fragen     Die Fragen über deine Firma beantworten — Claude führt dich durch
kimal3 kontext hoch       Deine lokalen Änderungen an den fünf Firmen-Texten hochschicken
kimal3 projekt neu …      Ein Projekt ins Erfolgsprofil eintragen
kimal3 projekt liste      Deine eingetragenen Projekte anzeigen
kimal3 plan               Den Stand der Planung holen und Änderungen melden
kimal3 plan melde         Eine Änderung an die Projektseite melden (Meldung als JSON von der Eingabe)
kimal3 plan senden        Gemerkte Meldungen nachschicken, die offline nicht ankamen
kimal3 projekt verbinden  Den Projektordner mit seinem Projekt in der App verbinden
kimal3 plan hoch          Nur noch mit --ueberschreiben: den ganzen Stand durch plan/stand.json ersetzen
kimal3 kurs               Zeigen, wo du im Mini-Kurs stehst
kimal3 firma daten        Die Daten deiner Firma holen, damit Claude sie auswerten kann
kimal3 zeigen start       Eine Aufnahme starten, während du eine Aufgabe vormachst
kimal3 zeigen status      Nachsehen, ob gerade aufgenommen wird und ob der Aufnehmer eingerichtet ist
kimal3 wache              Läuft von selbst beim Start von Claude: prüft Zugang, Nachricht, Version, Skill
kimal3 wache aus          Die tägliche Prüfung abschalten — sie sagt dann nichts mehr
kimal3 wache an           Sie wieder einschalten
kimal3 logout             Verbindung wieder aufheben
```

Mehr zu einem Befehl: `kimal3 projekt neu --help`

## Was eingetragen wird

Nur, was du eingibst — Titel, Beschreibung, optional ein Link. **Dein Code wird nicht
gelesen, nicht hochgeladen und nicht analysiert.** Das Werkzeug schreibt ausschließlich
über die KImal3-App und hat keinen eigenen Datenbankzugang.

Eingetragene Projekte sind zunächst **nicht öffentlich**. Sie erscheinen in deinem
Erfolgsprofil, und du entscheidest dort, was sichtbar wird.

## Rückgabewerte

Für Skripte und für Claude selbst:

| Wert | Bedeutung | Hilft |
|---|---|---|
| `0` | hat geklappt | — |
| `1` | Eingabe unvollständig, nichts gefunden — oder deine Claude-Einstellungen sind nicht lesbar | die Meldung lesen, sie nennt den Fall |
| `2` | nicht angemeldet | `kimal3 login` |
| `3` | gerade nicht erreichbar | später noch einmal |
| `4` | kein Pro-Konto | erneutes Versuchen hilft **nicht** |

Der Unterschied zwischen `3` und `4` ist Absicht: Bei `3` lohnt ein zweiter Versuch,
bei `4` nie.

## Update-Hinweise

Steht eine neuere Fassung bereit, schreibt `kimal3` nach dem Befehl eine eingerückte
Zeile — höchstens **einmal am Tag**:

```
  →  kimal3 0.2.0 ist da.  npm i -g kimal3@latest && kimal3 skill install
```

Sie geht auf **stderr**, nicht auf stdout: `kimal3 firma daten > firma.json` bleibt
damit sauberes JSON. Sie **ändert den Rückgabewert nicht** — eine `0` bleibt eine `0`.
Und `kimal3` **installiert nichts von selbst**; der Befehl steht in der Zeile, ausführen
tust du ihn.

Dasselbe gilt für die Skill-Dateien: Sind die in `~/.claude/skills/kimal3/` älter als
das installierte Werkzeug, sagt `kimal3` es — dafür braucht es kein Netz.

## Die tägliche Prüfung — und wie du sie abstellst

`kimal3 skill install` trägt eine Zeile in deine Claude-Einstellungen ein
(`~/.claude/settings.json`). Sie sorgt dafür, dass beim Start von Claude `kimal3 wache`
läuft — still, wenn nichts ansteht; eine offene Aufgabe (Zugang, Fassung, Skill) meldet sie
in jeder Sitzung, bis sie erledigt ist. Die Prüfung sieht nach, ob dein Zugang noch gilt, ob
eine neuere Fassung bereitsteht, ob deine `/k3`-Befehle veraltet sind und ob eine Nachricht
von uns anliegt.

**Sie meldet sich nur, wenn wirklich etwas ansteht.** Ist alles in Ordnung, sagt sie nichts.

Willst du sie nicht:

```
kimal3 wache aus     # ab jetzt still
kimal3 wache an      # doch wieder
```

Nach `kimal3 wache aus` wird **nichts mehr an unseren Server geschickt** — die Prüfung
steigt aus, bevor sie irgendetwas fragt. Gemessen: mit Prüfung rund 0,9 Sekunden, ohne
rund 0,19 Sekunden, und in den 0,19 Sekunden verlässt kein Byte deinen Rechner.

Die Zeile in den Einstellungen bleibt dabei stehen, damit `kimal3 wache an` sofort wirkt
und wir deine Einstellungsdatei nicht noch einmal anfassen müssen. Es startet also weiter
ein kleines Programm von uns, das nach rund 0,19 Sekunden wieder aufhört.

**Soll auch das nicht mehr passieren**, nimm die Zeile selbst heraus: In
`~/.claude/settings.json` steht unter `hooks` → `SessionStart` ein Eintrag, dessen Befehl
mit `kimal3 wache` beginnt (heute: `kimal3 wache --hook`, in älteren Installationen ohne
den Zusatz). ⚠️ **Der Zusatz `--hook` gehört in die Einstellungsdatei, nicht ins Terminal** —
getippt wird immer nur `kimal3 wache`. Lösch diesen einen Eintrag — den Rest der Datei lass, wie er ist.

## Voraussetzungen

Node.js 20 oder neuer. Sonst nichts — das Werkzeug bringt **keine fremden Bibliotheken**
mit.

## Lizenz

Proprietär. Die Nutzung ist Inhabern eines gültigen KImal3-Pro-Kontos gestattet;
Weitergabe, Veränderung und Weiterverwendung des Codes sind nicht erlaubt.

© KImal3 · https://kimal3.de

---

# kimal3 (English)

**Log your AI projects where they happen: in the terminal.**

If you work with Claude Code, you build real things — and then never write them up, because that would be an extra step in another window. `kimal3` closes that gap: at the end
of a session, Claude adds the finished project to your KImal3 success profile itself. All
you do is approve it there.

> **Requirement: a KImal3 account with Pro.**
> Without Pro, this tool tells you so and does nothing else.
> What Pro includes and how to get it: **https://app.kimal3.de/pro**

## Getting started

Once per computer:

```bash
npm install -g kimal3   # install the tool (needs Node.js)
kimal3 login            # connect this computer to your account
kimal3 skill install    # teach Claude to use the tool — and get the /k3 commands
```

> **In Claude Code?** Then have it set this up for you instead of typing it — the text to copy is on **https://app.kimal3.de/pro**. The only thing you type yourself is `kimal3 login` (with a `!` in front, there), because confirming it in the browser needs a person.

`login` shows you an address and an eight-character code. You open the address yourself and
confirm the code there, in your signed-in account — just like `gh auth login`.
**No password is ever typed into the terminal.**

## Commands

```
kimal3                    Shows whether this computer is signed in
kimal3 login              Connect this computer to your account
kimal3 skill install      Teach Claude to use this tool — and give you the /k3 commands
kimal3 workplace new      Create the whole AI Workplace — company level and workbench
kimal3 workbench new      Only create your own workbench in an existing company
kimal3 context download   Fetch the company context — CLAUDE.md and the five files in context/
kimal3 context questions  Answer the questions about your company — Claude takes you through them
kimal3 context upload     Upload your local changes to the five company texts
kimal3 project new …      Add a project to your success profile
kimal3 project list       Show the projects you've added
kimal3 plan               Fetch the planning state and report changes
kimal3 plan report        Report a change to the project page (report as JSON from the input)
kimal3 plan send          Send kept reports that didn't arrive while offline
kimal3 project connect    Connect the project folder with its project in the app
kimal3 plan upload        Only with --overwrite: replace the whole state with plan/stand.json
kimal3 course             Show where you are in the mini-course
kimal3 company data       Fetch your company's data so Claude can analyse it
kimal3 show start         Start a recording while you show a task
kimal3 show status        Check whether a recording is running and whether the recorder is set up
kimal3 watch              Runs by itself when Claude starts: checks your access, messages, version and skill
kimal3 watch off          Switch the daily check off — it then says nothing at all
kimal3 watch on           Switch it back on
kimal3 logout             Disconnect this computer
```

The German command names in the section above work too.

More about one command: `kimal3 project new --help`

## What gets recorded

Only what you enter — title, description, optionally a link. **Your code is not read,
not uploaded and not analysed.** The tool only writes through the KImal3 app and has
no database access of its own.

Projects you add are **not public** at first. They appear in your success profile, and you
decide there what becomes visible.

## Exit codes

For scripts and for Claude itself:

| Value | Meaning | What helps |
|---|---|---|
| `0` | it worked | — |
| `1` | input incomplete, nothing found — or your Claude settings can't be read | read the message, it names the case |
| `2` | not signed in | `kimal3 login` |
| `3` | can't be reached right now | try again later |
| `4` | no Pro account | trying again does **not** help |

The difference between `3` and `4` is deliberate: with `3` a second attempt is worth it,
with `4` it never is.

## Update notices

If a newer version is available, `kimal3` writes one indented line after the command — at
most **once a day**:

```
  →  There's a new version of kimal3.  npm i -g kimal3@latest && kimal3 skill install
```

It goes to **stderr**, not stdout: `kimal3 company data > company.json` stays clean JSON.
It **doesn't change the exit code** — a `0` stays a `0`. And `kimal3` **never installs
anything by itself**; the line shows the command; running it is up to you.

The same goes for the skill files: if the ones in `~/.claude/skills/kimal3/` are older than
the installed tool, or in a different language from your account, `kimal3` says so — this
works without an internet connection.

## The daily check — and how to switch it off

`kimal3 skill install` adds a line to your Claude settings (`~/.claude/settings.json`). It
makes `kimal3 watch` run when Claude starts — silent when nothing is pending; an open task
(access, version, skill) is reported in every session until it's done. The check looks at
whether your access is still valid, whether a newer version is available, whether your `/k3`
commands are out of date and whether there is a message from us.

**It only speaks up when something is really pending.** If everything is in order, it says
nothing.

If you don't want it:

```
kimal3 watch off     # silent from now on
kimal3 watch on      # back on again
```

After `kimal3 watch off`, **nothing is sent to our server any more** — the check stops before it asks our server anything. Measured: about 0.9 seconds with the check, about 0.19 seconds without, and in
those 0.19 seconds not a single byte leaves your computer.

The line in the settings stays, so that `kimal3 watch on` takes effect immediately and we
don't have to touch your settings file again. So a small program of ours still starts, and
stops again after about 0.19 seconds.

**If you don't want even that**, remove the line yourself: in `~/.claude/settings.json`,
under `hooks` → `SessionStart`, there is an entry whose command starts with `kimal3 wache` —
today `kimal3 wache --hook`, in older installations without `--hook`. ⚠️ **The `--hook` part belongs in the settings file, not in the terminal** — all you ever type is
`kimal3 watch`. Delete this one entry — leave the rest of the file as it is.

## Requirements

Node.js 20 or newer. Nothing else — the tool comes with **no third-party libraries**.

## Licence

Proprietary. Use is permitted for holders of a valid KImal3 Pro account; redistributing, modifying or reusing the code is not permitted.

© KImal3 · https://kimal3.de
