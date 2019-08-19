package darshtest;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class App {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "D:\\Selenium\\driver\\IEDriverServer.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("https://intellipaat.com");
		driver.manage().window().maximize();
		driver.findElement(By.className("t-search-input")).sendKeys("DevOps");
		driver.findElement(By.id("frontpagesubmitsearch")).click();
		driver.manage().timeouts().implicitlyWait(3,TimeUnit.SECONDS);
		String firstData = driver.findElement(By.className("block_title")).getText();
		String CheckData = "DevOps Certification Training Course";
				
		if(firstData.equals(CheckData)) {
			driver.findElement(By.className("block_media")).click();
			driver.manage().timeouts().implicitlyWait(3,TimeUnit.SECONDS);
		}
		else {
			System.out.println("Course not found");
		}


	}

}
