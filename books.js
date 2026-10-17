// Add more books by adding a line, then run: node fetch-covers.js
// Covers are saved to covers/<slug>.jpg. If the wrong edition is picked, add
// { coverId: 12345 } as the last argument (the number from an Open Library cover URL).
const slug = (title) =>
  title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const book = (title, year, author, blurb, extra) => ({
  title, year, author, blurb, cover: `covers/${slug(title)}.jpg`, ...extra,
});

const BOOKS = [
  // Adventure and classics
  book("Kidnapped", 1886, "Robert Louis Stevenson", "A teenage orphan is sold into slavery by his uncle and flees across the Scottish Highlands with a rebel Jacobite."),
  book("The Count of Monte Cristo", 1844, "Alexandre Dumas", "Wrongly imprisoned Edmond Dantès escapes, finds a fortune and spends years planning his revenge."),
  book("War and Peace", 1869, "Leo Tolstoy", "Five aristocratic families live through Napoleon's invasion of Russia in a vast portrait of love, war and fate."),
  book("Les Misérables", 1862, "Victor Hugo", "Ex-convict Jean Valjean is hounded by the relentless inspector Javert across decades of French upheaval."),
  book("Robinson Crusoe", 1719, "Daniel Defoe", "A shipwrecked sailor survives for years alone on a remote island."),
  book("Moll Flanders", 1722, "Daniel Defoe", "A woman born in Newgate Prison schemes and survives through marriages, theft and exile."),
  book("Great Expectations", 1861, "Charles Dickens", "Orphan Pip is lifted into society by a secret benefactor and learns what that rise really costs."),
  book("David Copperfield", 1850, "Charles Dickens", "A boy overcomes cruelty and poverty to become a writer, in Dickens's most personal novel."),
  book("The Adventures of Tom Sawyer", 1876, "Mark Twain", "A mischievous boy gets into trouble along the Mississippi, from whitewashed fences to a murder trial."),
  book("Adventures of Huckleberry Finn", 1884, "Mark Twain", "Huck and the escaped slave Jim drift down the Mississippi on a raft."),
  book("The Hobbit", 1937, "J. R. R. Tolkien", "Bilbo Baggins is swept into a dragon-hunting quest with thirteen dwarves and a wizard."),
  book("The Lord of the Rings", 1954, "J. R. R. Tolkien", "A hobbit sets out to destroy a ring of terrible power before the Dark Lord can reclaim it."),
  book("Watership Down", 1972, "Richard Adams", "A band of rabbits flees their doomed warren and searches for a new home."),

  // Jane Austen
  book("Sense and Sensibility", 1811, "Jane Austen", "Two sisters, one ruled by reason and one by feeling, face heartbreak and money troubles."),
  book("Pride and Prejudice", 1813, "Jane Austen", "Elizabeth Bennet and the proud Mr. Darcy navigate manners, money and misjudgment."),
  book("Mansfield Park", 1814, "Jane Austen", "Quiet Fanny Price is raised among wealthy relatives and holds firm to her principles."),
  book("Emma", 1815, "Jane Austen", "A confident young matchmaker meddles in her friends' lives and gets things wrong."),
  book("Persuasion", 1817, "Jane Austen", "Anne Elliot meets again the naval officer she was talked into rejecting eight years before."),

  // Brontës, Hardy, Collins
  book("Jane Eyre", 1847, "Charlotte Brontë", "An orphaned governess falls for her employer and uncovers the secret in his attic."),
  book("Wuthering Heights", 1847, "Emily Brontë", "Heathcliff's obsessive love for Catherine destroys two families on the Yorkshire moors."),
  book("Far from the Madding Crowd", 1874, "Thomas Hardy", "Independent Bathsheba Everdene is courted by three very different men."),
  book("The Woman in White", 1859, "Wilkie Collins", "A drawing master meets a mysterious woman in white and is pulled into a plot of stolen identity."),

  // Shakespeare and Holmes
  book("Hamlet", 1603, "William Shakespeare", "A Danish prince feigns madness while seeking revenge on the uncle who murdered his father."),
  book("Macbeth", 1606, "William Shakespeare", "A Scottish general murders his king after a prophecy and is consumed by guilt and ambition."),
  book("Othello", 1622, "William Shakespeare", "Iago's lies turn a Moorish general's love for Desdemona into jealous rage."),
  book("A Study in Scarlet", 1887, "Arthur Conan Doyle", "The first Sherlock Holmes story, in which he and Dr. Watson meet and solve a murder."),
  book("The Hound of the Baskervilles", 1902, "Arthur Conan Doyle", "Holmes investigates a family curse and a spectral hound on the Devon moors."),

  // Russian, French, German
  book("Crime and Punishment", 1866, "Fyodor Dostoevsky", "A destitute student commits murder and is tormented by his conscience."),
  book("All Quiet on the Western Front", 1929, "Erich Maria Remarque", "A young German soldier describes the horror and futility of trench warfare."),
  book("The Stranger", 1942, "Albert Camus", "Indifferent to convention, Meursault commits a killing in Algiers and faces judgment for who he is."),
  book("The Plague", 1947, "Albert Camus", "An Algerian city is sealed off by an epidemic, and its residents each respond differently."),
  book("The Fall", 1956, "Albert Camus", "A former lawyer confesses his life to a stranger in an Amsterdam bar."),

  // American 19th and early 20th century
  book("The Scarlet Letter", 1850, "Nathaniel Hawthorne", "Hester Prynne is branded for adultery in Puritan Boston and refuses to name her lover."),
  book("The House of the Seven Gables", 1851, "Nathaniel Hawthorne", "A New England family lives under an ancestral curse in a gloomy mansion."),
  book("The House of Mirth", 1905, "Edith Wharton", "Lily Bart's place in New York high society slips away as she resists a marriage of convenience."),
  book("Ethan Frome", 1911, "Edith Wharton", "A poor farmer in winter-bound Massachusetts is trapped between duty and a forbidden love."),
  book("The Age of Innocence", 1920, "Edith Wharton", "A lawyer in Gilded Age New York is torn between his fiancée and a scandalous countess."),
  book("My Ántonia", 1918, "Willa Cather", "A narrator recalls a Bohemian immigrant girl growing up on the Nebraska prairie."),
  book("Death Comes for the Archbishop", 1927, "Willa Cather", "Two French priests spend decades building a diocese in the New Mexico territory."),
  book("Main Street", 1920, "Sinclair Lewis", "An educated young woman tries to reform a narrow-minded Midwestern town."),
  book("Arrowsmith", 1925, "Sinclair Lewis", "A dedicated young doctor struggles to hold on to scientific ideals."),
  book("Spoon River Anthology", 1915, "Edgar Lee Masters", "The dead of a small Illinois town speak their epitaphs, revealing what the town never knew."),
  book("Our Town", 1938, "Thornton Wilder", "A play about everyday life, love and death in a small New Hampshire town."),
  book("The Grapes of Wrath", 1939, "John Steinbeck", "The Joad family leaves the Dust Bowl for California in search of work and dignity."),
  book("Native Son", 1940, "Richard Wright", "Bigger Thomas, a young Black man in 1930s Chicago, is trapped by fear and circumstance."),

  // Mid century
  book("The Murder of Roger Ackroyd", 1926, "Agatha Christie", "Hercule Poirot investigates a village murder with one of the most famous twists in mystery fiction."),
  book("A Coffin for Dimitrios", 1939, "Eric Ambler", "A crime writer traces the shadowy career of a notorious criminal across Europe."),
  book("Tales of the South Pacific", 1947, "James A. Michener", "Linked stories of American servicemen and island locals during World War II."),
  book("Cry, the Beloved Country", 1948, "Alan Paton", "A Zulu pastor travels to Johannesburg to find his son in apartheid-era South Africa."),
  book("A Town Like Alice", 1950, "Nevil Shute", "A woman who survived a Malayan death march rebuilds her life in the Australian outback."),
  book("The Daughter of Time", 1951, "Josephine Tey", "A bedridden detective investigates whether Richard III really murdered the princes in the Tower."),
  book("The Catcher in the Rye", 1951, "J. D. Salinger", "Holden Caulfield wanders New York after being expelled from prep school."),
  book("Lord of the Flies", 1954, "William Golding", "Schoolboys stranded on an island descend into savagery."),
  book("A Good Man Is Hard to Find", 1955, "Flannery O'Connor", "Dark, funny Southern Gothic stories about grace and violence."),
  book("On the Beach", 1957, "Nevil Shute", "In Australia, people wait calmly for radioactive fallout from a nuclear war to reach them."),
  book("Animal Farm", 1945, "George Orwell", "Farm animals overthrow their owner and the revolution is betrayed by its pigs."),
  book("Hawaii", 1959, "James A. Michener", "A sweeping history of the islands, from volcanic birth through waves of settlers."),
  book("Alas, Babylon", 1959, "Pat Frank", "A small Florida town struggles to survive after nuclear war."),
  book("To Kill a Mockingbird", 1960, "Harper Lee", "Scout Finch watches her father defend a Black man falsely accused in 1930s Alabama."),
  book("Up the Down Staircase", 1965, "Bel Kaufman", "A new teacher in a New York public high school survives bureaucracy and finds her students."),

  // Faulkner and Mansfield
  book("The Sound and the Fury", 1929, "William Faulkner", "The decline of a Mississippi family told through four voices."),
  book("As I Lay Dying", 1930, "William Faulkner", "The Bundren family journeys to bury their mother, narrated by fifteen voices."),
  book("The Garden Party and Other Stories", 1922, "Katherine Mansfield", "Delicate short stories about class, mortality and small moments of change."),

  // 1970s and later
  book("Shoeless Joe", 1982, "W. P. Kinsella", "An Iowa farmer builds a baseball field in his corn. The book behind the film Field of Dreams."),
  book("The Winds of War", 1971, "Herman Wouk", "A naval officer's family is swept into the opening years of World War II."),
  book("War and Remembrance", 1978, "Herman Wouk", "The Henry family endures the later war years and the Holocaust."),
  book("Tinker Tailor Soldier Spy", 1974, "John le Carré", "George Smiley hunts a Soviet mole inside British intelligence."),
  book("Chesapeake", 1978, "James A. Michener", "Four centuries of families on Maryland's Eastern Shore."),
  book("Obasan", 1981, "Joy Kogawa", "A Japanese Canadian woman remembers her family's internment during World War II."),
  book("Until Proven Guilty", 1985, "J. A. Jance", "Seattle detective J. P. Beaumont investigates a murdered girl in the first of his series."),
  book("Alaska", 1988, "James A. Michener", "The story of the Alaskan land and the people who have claimed it."),
  book("The Pillars of the Earth", 1989, "Ken Follett", "A master builder dreams of a cathedral in a medieval England torn by civil war."),
  book("The Pelican Brief", 1992, "John Grisham", "A law student's theory about two judges' murders puts her on the run."),
  book("Parable of the Sower", 1993, "Octavia E. Butler", "A teenager in a collapsing California founds a new belief system to survive."),
  book("Year of Wonders", 2001, "Geraldine Brooks", "An English village isolates itself during the plague of 1666."),
  book("The Dog Stars", 2012, "Peter Heller", "A pilot and his dog survive after a pandemic, guarding a small airfield in Colorado."),
  book("The Secret Chord", 2015, "Geraldine Brooks", "A novel of the life of King David, told by the prophet Nathan."),
  book("How to Stop Time", 2017, "Matt Haig", "A man who ages very slowly has lived for centuries and tries to hide it."),
  book("The Midnight Library", 2020, "Matt Haig", "Between life and death, Nora finds a library of every life she could have lived."),
  book("The End of October", 2020, "Lawrence Wright", "A deadly virus spreads and a disease detective races to stop it."),
  book("The Lincoln Highway", 2021, "Amor Towles", "Four boys set out across 1950s America with very different plans for the trip."),
  book("Project Hail Mary", 2021, "Andy Weir", "A man wakes alone on a spaceship with no memory and a mission to save Earth."),
  book("The Women", 2024, "Kristin Hannah", "A young nurse serves in Vietnam and finds that coming home is harder than going."),
];
