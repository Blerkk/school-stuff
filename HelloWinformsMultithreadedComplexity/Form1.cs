using System;
using System.Windows.Forms;
using System.Threading;

namespace HelloWinformsMultithreadedComplexity
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		private void button1_Click(object sender, System.EventArgs e)
		{
			var thread = new Thread(StartCountingUp);
			var thread2 = new Thread(StartCountingDown);
			thread.IsBackground = true;
			thread.Start();
			thread2.IsBackground = true;
			thread2.Start();
			button1.Enabled = false;
		}

		private delegate void DisplayCountDelegate(int i);
		private delegate void DisplayCountDelegate2(int j);
		private delegate void EnableButtonDelegate();

        private void StartCountingUp()
		{
			for (var i = 0; i < 10; i++)
			{
				textBox1.Invoke(new DisplayCountDelegate(DisplayCount), i);
				Thread.Sleep(1000);
			}
			button1.Invoke(new EnableButtonDelegate(EnableButton));
		}

		private void StartCountingDown()
		{
			for (var j = 10; j > 0; j--)
			{
				textBox2.Invoke(new DisplayCountDelegate(DisplayCount2), j);
				Thread.Sleep(1000);
			}
			button1.Invoke(new EnableButtonDelegate(EnableButton));
		}

		private void EnableButton()
		{
			button1.Enabled = true;
		}

		private void DisplayCount(int i)
		{
			textBox1.Text = i.ToString();
		}
		private void DisplayCount2(int j)
		{
			textBox2.Text = j.ToString();
		}
	}
}
