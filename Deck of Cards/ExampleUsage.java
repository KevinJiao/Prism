public class ExampleUsage {
    public static void main(String[] args){

        StandardDeck deck = new StandardDeck();
        deck.Shuffle();

        for (int i = 0; i < 52; i ++){
            System.out.println(deck.GetNextCard());
        }

        deck.Shuffle();
    }
}
