package models;
import  javax.persistence.*;
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
@Entity
public class Ward {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long Id;

    public String Name;

    public String Category;

    public String Password;

}
